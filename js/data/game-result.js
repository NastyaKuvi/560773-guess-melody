import {GameData} from './game-data.js';

const calculatePoints = (answer, result) => {
  if (answer.answered) {
    if (answer.time < GameData.fastAnswerTime) {
      result.fast += GameData.answerPoints.fast;
    } else {
      result.normal += GameData.answerPoints.normal;
    }
  } else {
    result.wrong += GameData.answerPoints.wrong;
  }
};

const getPlayerScore = (playerAnswers, remainingLifes) => {

  if (!Array.isArray(playerAnswers)) {
    throw new Error(`Answers should be of type array`);
  }

  if (typeof remainingLifes !== `number`) {
    throw new Error(`Remaining lifes should be of type number`);
  }

  if (remainingLifes < GameData.minLifes || remainingLifes > GameData.maxLifes) {
    throw new Error(`Remaining lifes should be a value from 0 to 3`);
  }

  const result = {
    normal: 0,
    fast: 0,
    wrong: 0,
    getTotal() {
      const total = this.normal + this.fast + this.wrong;
      return total ? total : GameData.failedScore;
    }
  };

  if (remainingLifes !== GameData.minLifes &&
    playerAnswers.length === GameData.questionsQuantity) {
    playerAnswers.forEach((answer) => {
      calculatePoints(answer, result);
    });
  }

  return {common: result.getTotal(), fast: result.fast};
};

const displayPlayerScore = (scores, playerResult) => {
  if (!Array.isArray(scores)) {
    throw new Error(`scores should be of type array`);
  }

  if (typeof playerResult !== `object`) {
    throw new Error(`player result should be of type object`);
  }

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
