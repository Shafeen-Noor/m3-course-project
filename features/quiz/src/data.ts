import type { Outcome, Question } from "./play/types.ts"

export const outcomes: Outcome[] = [
  {
    id: "focus",
    title: "Deep Focus",
    description: "A quiet plan helps you get into a steady flow.",
  },
  {
    id: "balance",
    title: "Balanced Pace",
    description: "You do your best with a mix of work and breaks.",
  },
  {
    id: "recharge",
    title: "Fresh Start",
    description: "Rest and a clear reset help you feel ready.",
  },
  {
    id: "explore",
    title: "Curious Mode",
    description: "A new idea or place gives your day momentum.",
  },
]

export const quiz: Question[] = [
  {
    kind: "choice",
    text: "What helps you begin a study session?",
    choices: [
      { label: "A clear desk and a short list", outcome: "focus", points: 3 },
      { label: "A timer with planned breaks", outcome: "balance", points: 2 },
      { label: "A walk before I start", outcome: "recharge", points: 2 },
      { label: "A fresh topic to explore", outcome: "explore", points: 3 },
    ],
  },
  {
    kind: "scale",
    text: "How much do you like trying a new study method?",
    low: "not much",
    high: "a lot",
    outcome: "explore",
  },
  {
    kind: "yesno",
    text: "Do you usually plan your study time ahead?",
    outcome: "focus",
  },
]
