import { type Outcome, type Question, type Quiz } from "./lib/types.ts"

const outcomes: Outcome[] = [
  {
    id: "focus",
    title: "Focus Mode",
    description: "A quiet place and one task at a time may work best.",
  },
  {
    id: "balance",
    title: "Balanced Mode",
    description: "A steady mix of focused work and short breaks should fit.",
  },
  {
    id: "recharge",
    title: "Recharge Mode",
    description: "A lighter session with room to rest could help today.",
  },
  {
    id: "explore",
    title: "Explore Mode",
    description: "Try a new topic or a different way to study today.",
  },
]

const questions: Question[] = [
  {
    kind: "choice",
    label: "What would help you get started?",
    hint: "Choose the option that sounds useful today.",
    choices: [
      { label: "A quiet desk", outcome: "focus", points: 3 },
      { label: "A short plan with breaks", outcome: "balance", points: 3 },
      { label: "A slower start", outcome: "recharge", points: 3 },
      { label: "A new topic", outcome: "explore", points: 3 },
    ],
  },
  {
    kind: "scale",
    label: "How much energy do you have?",
    low: "very little",
    high: "a lot",
    outcome: "recharge",
  },
  {
    kind: "yesno",
    label: "Would a short break help you stay on track?",
    outcome: "balance",
  },
]

export const quiz: Readonly<Quiz> = { outcomes, questions }
