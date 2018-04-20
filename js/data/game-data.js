import {getLevelArtist, getLevelGenre} from "./music-data";

const GAME_TYPE = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const GameData = {
  questionsQuantity: 10,
  minLifes: 0,
  maxLifes: 3,
  mistakes: 0,
  answerPoints: {
    normal: 1,
    fast: 2,
    wrong: -2,
  },
  fastAnswerTime: 30,
  allTime: 300,
  failedScore: -1,
  absoluteWinner: 1
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

const Levels = [
  {
    type: GAME_TYPE.ARTIST,
    info: getLevelArtist(),
  },
  {
    type: GAME_TYPE.GENRE,
    info: getLevelGenre(),
  },
  {
    type: GAME_TYPE.ARTIST,
    info: getLevelArtist(),
  },
  {
    type: GAME_TYPE.GENRE,
    info: getLevelGenre(),
  },
  {
    type: GAME_TYPE.ARTIST,
    info: getLevelArtist(),
  },
  {
    type: GAME_TYPE.GENRE,
    info: getLevelGenre(),
  },
  {
    type: GAME_TYPE.ARTIST,
    info: getLevelArtist(),
  },
  {
    type: GAME_TYPE.GENRE,
    info: getLevelGenre(),
  },
  {
    type: GAME_TYPE.ARTIST,
    info: getLevelArtist(),
  }
];

export {
  GAME_TYPE,
  GameData,
  FailedData,
  Levels
};
