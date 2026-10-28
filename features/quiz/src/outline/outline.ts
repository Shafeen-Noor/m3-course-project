import { type Quiz } from "../lib/types.ts"

export interface QuizOutline {
  questions: number
  choice: number
  scale: number
  yesno: number
  outcomes: number
}

export function buildOutline(quiz: Quiz): QuizOutline {
  return quiz.questions.reduce<QuizOutline>(
    (outline, question) => {
      outline.questions += 1
      outline[question.kind] += 1
      return outline
    },
    {
      questions: 0,
      choice: 0,
      scale: 0,
      yesno: 0,
      outcomes: quiz.outcomes.length,
    },
  )
}
