export type OutcomeId = "focus" | "balance" | "recharge" | "explore"

export interface Outcome {
  id: OutcomeId
  title: string
  description: string
}

export interface Choice {
  label: string
  outcome: OutcomeId
  points: number
}

interface BaseQuestion {
  text: string
}

export interface ChoiceQuestion extends BaseQuestion {
  kind: "choice"
  choices: Choice[]
}

export interface ScaleQuestion extends BaseQuestion {
  kind: "scale"
  low: string
  high: string
  outcome: OutcomeId
}

export interface YesNoQuestion extends BaseQuestion {
  kind: "yesno"
  outcome: OutcomeId
}

export type Question = ChoiceQuestion | ScaleQuestion | YesNoQuestion

export interface ChoiceAnswer {
  kind: "choice"
  picked: Choice
}

export interface ScaleAnswer {
  kind: "scale"
  value: number
}

export interface YesNoAnswer {
  kind: "yesno"
  value: boolean
}

export type Answer = ChoiceAnswer | ScaleAnswer | YesNoAnswer

export interface Settings {
  showPoints: boolean
  nickname?: string
}

export interface SavedGame {
  answers: Answer[]
  completed: boolean
}
