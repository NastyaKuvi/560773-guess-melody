import GameData from './game-data.js';

const getPlayerScore = (playerAnswers, remainingLifes) => {
  let resultScore = GameData.failedScore;

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
    resultScore = 0;
    playerAnswers.forEach((answer) => {
      if (answer.answered) {
        if (answer.time < GameData.fastAnswerTime) {
          resultScore += GameData.answerPoints.fast;
        } else {
          resultScore += GameData.answerPoints.normal;
        }
      } else {
        resultScore += GameData.answerPoints.wrong;
      }
    });
  }

  return resultScore;
};

const displayPlayerScore = (scores, playerResult) => {
  let resultMessage = ``;

  if (!Array.isArray(scores)) {
    throw new Error(`scores should be of type array`);
  }

  if (typeof playerResult !== `object`) {
    throw new Error(`player result should be of type object`);
  }

  if (playerResult.lifes === GameData.minLifes) {
    resultMessage = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (playerResult.time > GameData.allTime) {
    resultMessage = `Время вышло! Вы не успели отгадать все мелодии`;
  } else {
    scores.push(playerResult.points);
    scores.sort((res1, res2) => res2 - res1);
    let position = scores.indexOf(playerResult.points) + 1;
    let count = scores.length;
    let percent = Math.round((count - position) / count * 100);
    resultMessage = `Вы заняли ${position} место из ${count} игроков. Это лучше, чем у ${percent}% игроков`;
  }

  return resultMessage;
};

export {
  getPlayerScore,
  displayPlayerScore
};
