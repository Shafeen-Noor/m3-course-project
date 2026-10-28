import type { Question } from "../play/types.ts"

export interface KindCounts {
  choice: number
  scale: number
  yesno: number
}

export default function outline(quiz: Question[]): string[] {
  return quiz.map((question, index) => {
    if (question.kind === "choice") {
      return `${index + 1}. ${question.text} (choice, ${question.choices.length} options)`
    }
    if (question.kind === "scale") {
      return `${index + 1}. ${question.text} (scale)`
    }
    if (question.kind === "yesno") {
      return `${index + 1}. ${question.text} (yes or no)`
    }
    throw new Error("Unknown question kind")
  })
}

export function countKinds(quiz: Question[]): KindCounts {
  return quiz.reduce<KindCounts>(
    (counts, question) => {
      counts[question.kind] += 1
      return counts
    },
    { choice: 0, scale: 0, yesno: 0 },
  )
}
