export const savedGame = JSON.stringify({
  answers: [
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
  ],
  completed: true,
})

export const savedSettings = JSON.stringify({
  showPoints: true,
  nickname: "Learner",
})
