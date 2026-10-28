import { type Answer, type Settings } from "./lib/types.ts"

const initialAnswers: Answer[] = [
  {
    kind: "choice",
    picked: {
      label: "A short plan with breaks",
      outcome: "balance",
      points: 3,
    },
  },
  { kind: "scale", value: 3 },
  { kind: "yesno", value: true },
]

export const savedGame = JSON.stringify({
  answers: initialAnswers,
  startedAt: new Date(),
})

export const savedSettings = JSON.stringify({
  showPoints: true,
  nickname: "Sam",
} satisfies Settings)
