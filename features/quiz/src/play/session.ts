import type { Answer, Outcome, OutcomeId, Question } from "./types.ts"
import { award, type Award } from "./quiz.ts"

export type Status = "waiting" | "asking" | "done"

export class Session {
  private tally: Record<OutcomeId, number> = {
    focus: 0,
    balance: 0,
    recharge: 0,
    explore: 0,
  }
  private status: Status = "waiting"
  private outcomes: Outcome[]

  constructor(outcomes: Outcome[]) {
    this.outcomes = outcomes
  }

  start(): void {
    if (this.status !== "waiting")
      throw new Error("The quiz has already started")
    this.status = "asking"
  }

  record(question: Question, answer: Answer): Award {
    if (this.status !== "asking")
      throw new Error("The quiz is not asking questions")
    const result = award(question, answer)
    this.tally[result.outcome] += result.points
    return result
  }

  finish(): void {
    if (this.status !== "asking")
      throw new Error("The quiz is not asking questions")
    if (!this.outcomes.some((outcome) => this.tally[outcome.id] > 0)) {
      throw new Error("No points have been scored")
    }
    this.status = "done"
  }

  result(): Outcome {
    if (this.status !== "done") throw new Error("The quiz has not finished")
    return this.outcomes.reduce((best, outcome) =>
      this.tally[outcome.id] > this.tally[best.id] ? outcome : best,
    )
  }
}
