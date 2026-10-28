import { recap } from "./quiz.ts"
import {
  type Answer,
  type Outcome,
  type OutcomeId,
  type Question,
} from "./types.ts"

export type Status = "waiting" | "asking" | "done"

export interface Award {
  outcome: OutcomeId
  points: number
}

export class Session {
  private tally: Record<OutcomeId, number> = {
    focus: 0,
    balance: 0,
    recharge: 0,
    explore: 0,
  }

  private explanations: Record<OutcomeId, string[]> = {
    focus: [],
    balance: [],
    recharge: [],
    explore: [],
  }

  private outcomes: Outcome[]
  private status: Status = "waiting"

  constructor(outcomes: Outcome[]) {
    this.outcomes = outcomes
  }

  start(): void {
    if (this.status !== "waiting") {
      throw new Error("The session has already started")
    }
    this.status = "asking"
  }

  record(question: Question, answer: Answer): Award {
    if (this.status !== "asking") {
      throw new Error("The session is not asking questions")
    }

    const result = award(question, answer)
    this.tally[result.outcome] += result.points
    if (result.points > 0) {
      this.explanations[result.outcome].push(recap(question, answer))
    }
    return result
  }

  finish(): void {
    if (this.status !== "asking") {
      throw new Error("The session is not asking questions")
    }
    if (!this.outcomes.some((outcome) => this.tally[outcome.id] > 0)) {
      throw new Error("No points have been scored")
    }
    this.status = "done"
  }

  result(): Outcome {
    if (this.status !== "done") {
      throw new Error("The session has not finished")
    }
    return this.outcomes.reduce((best, outcome) =>
      this.tally[outcome.id] > this.tally[best.id] ? outcome : best,
    )
  }

  explain(): string[] {
    if (this.status !== "done") {
      throw new Error("The session has not finished")
    }
    return [...this.explanations[this.result().id]]
  }
}

function award(question: Question, answer: Answer): Award {
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
