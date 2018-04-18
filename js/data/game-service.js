import {setScreen} from "../utils";
import {Levels, GAME_TYPE, GameData, FailedData} from "./game-data";
import screenLevelArtist from "../screens/screen-level-artist";
import screenLevelGenre from "../screens/screen-level-genre";
import screenResultSuccess from "../screens/screen-result-success";
import screenFailedGame from "../screens/screen-failed-game";
import {getPlayerScore, displayPlayerScore} from "./game-result";

let currentLevel = 0;
let userData = [];

const startGame = () => {
  currentLevel = 0;
  const level = Levels[currentLevel];
  if (level.type === GAME_TYPE.ARTIST) {
    setNextLevel(level.info, screenLevelArtist);
    // setScreen(screenLevelArtist(level.info));
  } else if (level.type === GAME_TYPE.GENRE) {
    setNextLevel(level.info, screenLevelGenre);
    // setScreen(screenLevelGenre(level.info));
  }
};

const setNextLevel = (info, cb) => {
  setScreen(cb(info));
};

const checkAnswer = (answer) => {
  userData.push(answer);
  currentLevel++;
  if (answer.answered) {

    if (currentLevel === GameData.questionsQuantity - 1) {
      const resultData = prepareResultData();
      setScreen(screenResultSuccess(resultData));
      return;
    }
  } else {
    if (++GameData.mistakes === GameData.maxLifes) {
      setScreen(screenFailedGame(FailedData.attemptsEnded));
      return;
    }
  }

  const level = Levels[currentLevel];
  if (level.type === GAME_TYPE.ARTIST) {
    setNextLevel(level.info, screenLevelArtist);
  } else if (level.type === GAME_TYPE.GENRE) {
    setNextLevel(level.info, screenLevelGenre);
  }
};

const prepareResultData = () => {
  const score = getPlayerScore(userData);
  const result = {
    minute: `2`,
    second: `58`,
    score: score.common,
    fastQ: score.fast,
    mistakes: 2,
    toDisplay: displayPlayerScore([2, 4, 6, 8, 10, 12],
        {lifes: GameData.maxLifes - GameData.mistakes,
          points: score.common})
  };
  return result;
};

export {
  startGame,
  checkAnswer
};
