import { isAnswer } from "../play/guards.ts"
import type { SavedGame } from "../play/types.ts"

export function isSavedGame(value: unknown): value is SavedGame {
  if (typeof value !== "object" || value === null) return false
  const game = value as Record<string, unknown>
  return (
    Array.isArray(game.answers) &&
    game.answers.every(isAnswer) &&
    typeof game.completed === "boolean"
  )
}

export function loadSavedGame(raw: string): SavedGame {
  const value: unknown = JSON.parse(raw)
  if (!isSavedGame(value)) throw new Error("Saved game data is invalid")
  return value
}
