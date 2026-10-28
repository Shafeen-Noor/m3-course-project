import { isSettings } from "../play/guards.ts"
import type { Settings } from "../play/types.ts"

export function loadSettings(raw: string): Settings {
  const value: unknown = JSON.parse(raw)
  if (!isSettings(value)) throw new Error("Saved settings are invalid")
  return value
}
