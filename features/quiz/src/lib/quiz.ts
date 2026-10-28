import {
  type Answer,
  type Choice,
  type Question,
  type Settings,
} from "./types.ts"

export interface Award {
  outcome: Choice["outcome"]
  points: number
}

export function show(question: Question, settings?: Settings): string {
  const prefix = settings?.nickname ? `${settings.nickname}, ` : ""
  const hint = question.hint ? `\n${question.hint}` : ""

  if (question.kind === "choice") {
    const choices = question.choices.map(
      (choice, index) => `  ${index + 1}. ${choice.label}`,
    )
    return `${prefix}${question.label}\n${choices.join("\n")}${hint}`
  }

  if (question.kind === "scale") {
    return `${prefix}${question.label} (1 = ${question.low}, 5 = ${question.high})${hint}`
  }

  if (question.kind === "yesno") {
    return `${prefix}${question.label} (yes or no)${hint}`
  }

  throw new Error("Unknown question kind")
}

export function award(question: Question, answer: Answer): Award {
  if (question.kind !== answer.kind) {
    throw new Error("The answer does not match the question")
  }

  if (question.kind === "choice" && answer.kind === "choice") {
    const choice = question.choices.find(
      (option) => option.label === answer.picked.label,
    )
    if (!choice) throw new Error("The selected choice is not available")
    return { outcome: choice.outcome, points: choice.points }
  }

  if (question.kind === "scale" && answer.kind === "scale") {
    if (
      !Number.isInteger(answer.value) ||
      answer.value < 1 ||
      answer.value > 5
    ) {
      throw new Error("Scale answers must be between 1 and 5")
    }
    return { outcome: question.outcome, points: answer.value }
  }

  if (question.kind === "yesno" && answer.kind === "yesno") {
    return { outcome: question.outcome, points: answer.value ? 1 : 0 }
  }

  throw new Error("Unknown question kind")
}

export function recap(question: Question, answer: Answer): string {
  if (question.kind !== answer.kind) {
    throw new Error("The answer does not match the question")
  }

  if (question.kind === "choice" && answer.kind === "choice") {
    return `${question.label} ${answer.picked.label}`
  }

  if (question.kind === "scale" && answer.kind === "scale") {
    return `${question.label} ${answer.value}/5`
  }

  if (question.kind === "yesno" && answer.kind === "yesno") {
    return `${question.label} ${answer.value ? "Yes" : "No"}`
  }

  throw new Error("Unknown question kind")
}
