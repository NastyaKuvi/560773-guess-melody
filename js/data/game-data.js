const LevelType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const GameData = {
  questionsQuantity: 10,
  minLifes: 0,
  maxLifes: 3,
  answerPoints: {
    normal: 1,
    fast: 2,
    wrong: -2,
  },
  fastAnswerTime: 30,
  failedScore: -1,
  allTime: 300,
  absoluteWinner: 1
};

const InitialGameState = {
  level: 1,
  mistakes: 0,
  time: GameData.allTime
};

const FailedData = {
  attemptsEnded: {
    title: `Какая жалость!`,
    text: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    buttonText: `Попробовать ещё раз`
  },
  timeOver: {
    title: `Увы и ах!`,
    text: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    buttonText: `Попробовать ещё раз`
  }
};

export {
  LevelType,
  InitialGameState,
  GameData,
  FailedData
};
