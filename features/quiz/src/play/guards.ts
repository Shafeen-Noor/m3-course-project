import type { Answer, Choice, Settings } from "./types.ts"

export function isAnswer(value: unknown): value is Answer {
  if (typeof value !== "object" || value === null) return false
  const answer = value as Record<string, unknown>
  if (answer.kind === "choice") return isChoice(answer.picked)
  if (answer.kind === "scale") return typeof answer.value === "number"
  if (answer.kind === "yesno") return typeof answer.value === "boolean"
  return false
}

export function isChoice(value: unknown): value is Choice {
  if (typeof value !== "object" || value === null) return false
  const choice = value as Record<string, unknown>
  return (
    typeof choice.label === "string" &&
    typeof choice.outcome === "string" &&
    typeof choice.points === "number"
  )
}

export function isSettings(value: unknown): value is Settings {
  if (typeof value !== "object" || value === null) return false
  const settings = value as Record<string, unknown>
  return (
    typeof settings.showPoints === "boolean" &&
    (settings.nickname === undefined || typeof settings.nickname === "string")
  )
}
