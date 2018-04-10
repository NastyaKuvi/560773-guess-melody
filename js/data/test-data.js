const NotAllAnsweredByAttempts = {
  lifes: 0,
  answers: [
    {
      answered: true,
      time: 45
    },
    {
      answered: false,
      time: 37
    },
    {
      answered: false,
      time: 21
    },
    {
      answered: true,
      time: 35
    },
    {
      answered: true,
      time: 15
    },
    {
      answered: true,
      time: 24
    },
    {
      answered: false,
      time: 31
    },
  ],
};

const NormalAllAnswered = {
  lifes: 3,
  answers: [
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
    {
      answered: true,
      time: 30
    },
  ],
};

const RandomAllAnswered = {
  lifes: 2,
  answers: [
    {
      answered: true,
      time: 20
    },
    {
      answered: true,
      time: 10
    },
    {
      answered: false,
      time: 3
    },
    {
      answered: true,
      time: 31
    },
    {
      answered: true,
      time: 35
    },
    {
      answered: true,
      time: 17
    },
    {
      answered: true,
      time: 5
    },
    {
      answered: true,
      time: 47
    },
    {
      answered: true,
      time: 10
    },
    {
      answered: true,
      time: 36
    },
  ],
};

const GamesResult = [
  {
    statistic: [4, 5, 8, 11],
    playerResult: {
      points: 10,
      time: 280,
      lifes: 1
    },
    message: `Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`
  },
  {
    statistic: [4, 5, 8, 11],
    playerResult: {
      points: 10,
      time: 310,
      lifes: 3
    },
    message: `Время вышло! Вы не успели отгадать все мелодии`
  },
  {
    statistic: [4, 5, 8, 11],
    playerResult: {
      points: 10,
      time: 30,
      lifes: 0
    },
    message: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`
  },
  {
    statistic: [4, 5, 8, 9, 10],
    playerResult: {
      points: 11,
      time: 280,
      lifes: 1
    },
    message: `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`
  }
];

export {
  NotAllAnsweredByAttempts,
  NormalAllAnswered,
  RandomAllAnswered,
  GamesResult
};
