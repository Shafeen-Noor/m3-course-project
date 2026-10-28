import { quiz, outcomes } from "@platform/quiz/data"
import { recap, Session, show, type Answer } from "@platform/quiz/play"
import { loadSavedGame, loadSettings } from "@platform/quiz/saved"
import outline, { countKinds } from "@platform/quiz/outline"
import { savedGame, savedSettings } from "./saved.ts"

const answers: Answer[] = [
  {
    kind: "choice",
    picked: {
      label: "A clear desk and a short list",
      outcome: "focus",
      points: 3,
    },
  },
  { kind: "scale", value: 4 },
  { kind: "yesno", value: true },
]
const settings = loadSettings(savedSettings)
const saved = loadSavedGame(savedGame)
const kinds = countKinds(quiz)

console.log("## Outline")
console.log(outline(quiz).join("\n"))
console.log(
  `\nKinds: choice ${kinds.choice}, scale ${kinds.scale}, yesno ${kinds.yesno}`,
)
console.log("\n## Quiz")

const session = new Session(outcomes)
session.start()

for (const [index, question] of quiz.entries()) {
  const answer = answers[index]
  const result = session.record(question, answer)
  console.log(show(question, settings))
  console.log(recap(question, answer))
  if (settings.showPoints)
    console.log(
      `${result.points} ${result.points === 1 ? "point" : "points"} for ${result.outcome}`,
    )
}

session.finish()
const result = session.result()
console.log(`\nYou are: ${result.title}`)
console.log(result.description)
console.log(`Saved answers: ${saved.answers.length}`)
