import {GameData} from './game-data.js';

const getCalculatedPoints = (answer) => {
  if (answer.answered) {
    if (answer.time < GameData.fastAnswerTime) {
      return GameData.answerPoints.fast;
    }
    return GameData.answerPoints.normal;
  }
  return GameData.answerPoints.wrong;
};

const getFastPoints = (answer) => {
  if (answer.answered || answer.time < GameData.fastAnswerTime) {
    return GameData.answerPoints.fast;
  }
  return 0;
};

const getPlayerScore = (playerAnswers, remainingLifes) => {
  let common = GameData.failedScore;
  let fast = GameData.failedScore;

  if (!Array.isArray(playerAnswers)) {
    throw new Error(`Answers should be of type array`);
  }

  if (typeof remainingLifes !== `number`) {
    throw new Error(`Remaining lifes should be of type number`);
  }

  if (remainingLifes < GameData.minLifes || remainingLifes > GameData.maxLifes) {
    throw new Error(`Remaining lifes should be a value from 0 to 3`);
  }

  if (remainingLifes !== GameData.minLifes &&
    playerAnswers.length === GameData.questionsQuantity) {
    common = 0;
    fast = 0;
    playerAnswers.forEach((answer) => {
      common += getCalculatedPoints(answer);
      fast += getFastPoints(answer);
    });
  }

  return {common, fast};
};

const displayPlayerScore = (scores, playerResult) => {
  if (!Array.isArray(scores)) {
    throw new Error(`scores should be of type array`);
  }

  if (typeof playerResult !== `object`) {
    throw new Error(`player result should be of type object`);
  }

  // if (playerResult.lifes === GameData.minLifes) {
  //   return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  // }

  // if (playerResult.time > GameData.allTime) {
  //   return `Время вышло! Вы не успели отгадать все мелодии!`;
  // }

  if (scores.length === 0) {
    return `Вы первый кто выйграл в эту игру! Поздравляем!`;
  }

  scores.push(playerResult.points);
  scores.sort((res1, res2) => res2 - res1);

  const firstPosition = scores.indexOf(playerResult.points) + 1;
  if (firstPosition === GameData.absoluteWinner) {
    return `Вы заняли ${firstPosition} место! Вы сыграли лучше всех!`;
  }

  const lastPosition = scores.lastIndexOf(playerResult.points) + 1;
  const count = scores.length;
  const percent = Math.round((count - lastPosition) / count * 100);
  return `Вы заняли ${firstPosition} место из ${count} игроков. Это лучше, чем у ${percent}% игроков`;
};

export {
  getPlayerScore,
  displayPlayerScore
};
