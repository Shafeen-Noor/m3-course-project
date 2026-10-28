import {
  type Answer,
  type Choice,
  type OutcomeId,
  type Settings,
} from "./types.ts"

export interface SavedGame {
  answers: Answer[]
  startedAt?: string
}

const outcomeIds: OutcomeId[] = ["focus", "balance", "recharge", "explore"]

export function loadSavedGame(saved: string): SavedGame {
  let value: unknown

  try {
    value = JSON.parse(saved)
  } catch {
    throw new Error("Saved game is not valid text")
  }

  if (!isSavedGame(value)) {
    throw new Error("Saved game has an invalid structure")
  }

  return value
}

export function isSavedGame(value: unknown): value is SavedGame {
  if (typeof value !== "object" || value === null) return false

  if (
    !("answers" in value) ||
    !Array.isArray(value.answers) ||
    !value.answers.every(isAnswer)
  ) {
    return false
  }

  return !(
    "startedAt" in value &&
    value.startedAt !== undefined &&
    typeof value.startedAt !== "string"
  )
}

export function loadSettings(saved: string): Settings {
  let value: unknown

  try {
    value = JSON.parse(saved)
  } catch {
    throw new Error("Saved settings are not valid text")
  }

  if (!isSettings(value)) {
    throw new Error("Saved settings have an invalid structure")
  }

  return value
}

export function isSettings(value: unknown): value is Settings {
  if (typeof value !== "object" || value === null) return false
  if (!("name" in value) || typeof value.name !== "string") return false
  return !(
    "hints" in value &&
    value.hints !== undefined &&
    typeof value.hints !== "boolean"
  )
}

function isAnswer(value: unknown): value is Answer {
  if (typeof value !== "object" || value === null) return false
  if (!("kind" in value) || typeof value.kind !== "string") return false

  if (value.kind === "choice") {
    return "picked" in value && isChoice(value.picked)
  }

  if (value.kind === "scale") {
    return (
      "value" in value &&
      typeof value.value === "number" &&
      Number.isInteger(value.value) &&
      value.value >= 1 &&
      value.value <= 5
    )
  }

  return (
    value.kind === "yesno" &&
    "value" in value &&
    typeof value.value === "boolean"
  )
}

function isChoice(value: unknown): value is Choice {
  if (typeof value !== "object" || value === null) return false
  if (!("label" in value) || typeof value.label !== "string") return false
  if (!("outcome" in value) || typeof value.outcome !== "string") return false
  if (!("points" in value) || typeof value.points !== "number") return false
  return outcomeIds.includes(value.outcome as OutcomeId)
}
