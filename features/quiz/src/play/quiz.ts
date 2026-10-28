import type { Answer, OutcomeId, Question, Settings } from "./types.ts"

export interface Award {
  outcome: OutcomeId
  points: number
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
      answer.value < 0 ||
      answer.value > 5
    ) {
      throw new Error("Scale answers must be between 0 and 5")
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
    return `${question.text} ${answer.picked.label}`
  }
  if (question.kind === "scale" && answer.kind === "scale") {
    return `${question.text} ${answer.value}/5`
  }
  if (question.kind === "yesno" && answer.kind === "yesno") {
    return `${question.text} ${answer.value ? "Yes" : "No"}`
  }

  throw new Error("Unknown question kind")
}

export function show(question: Question, settings: Settings): string {
  const prefix = settings.nickname ? `${settings.nickname}, ` : ""
  if (question.kind === "choice") {
    return `${prefix}${question.text} (${question.choices.length} options)`
  }
  if (question.kind === "scale") {
    return `${prefix}${question.text} (${question.low} to ${question.high})`
  }
  if (question.kind === "yesno") {
    return `${prefix}${question.text} (yes or no)`
  }
  throw new Error("Unknown question kind")
}
