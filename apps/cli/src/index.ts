import { quiz } from "@platform/quiz/data"
import { buildOutline } from "@platform/quiz/outline"
import { recap, show } from "@platform/quiz/play"
import { loadSavedGame, loadSettings } from "@platform/quiz/saved"
import { Session } from "@platform/quiz/session"
import { savedGame, savedSettings } from "@platform/quiz"

const { answers } = loadSavedGame(savedGame)
const settings = loadSettings(savedSettings)

if (answers.length !== quiz.questions.length) {
  throw new Error("The saved answers do not match the quiz")
}

const session = new Session(quiz.outcomes)
session.start()

console.log("Study Mode Finder")
console.log()

for (const [index, question] of quiz.questions.entries()) {
  const answer = answers[index]
  const result = session.record(question, answer)

  console.log(show(question, settings))
  console.log(recap(question, answer))
  if (settings.showPoints) {
    const label = result.points === 1 ? "point" : "points"
    console.log(`${result.points} ${label} for ${result.outcome}`)
  }
  console.log()
}

session.finish()

const result = session.result()
const outline = buildOutline(quiz)

console.log(`Suggested approach: ${result.title}`)
console.log(result.description)
console.log()
console.log(
  `Outline: ${outline.questions} questions, ${outline.choice} choice, ${outline.scale} scale, ${outline.yesno} yes/no, ${outline.outcomes} outcomes`,
)
