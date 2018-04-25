import {Levels, GAME_TYPE, GameData, FailedData, InitialGameState} from "./game-data";
import {getPlayerScore, displayPlayerScore} from "./game-result";
import LevelArtistView from "../views/level-artist-view";
import LevelGenreView from "../views/level-genre-view";
import FailedGameView from "../views/failed-game-view";
import SuccessGameView from "../views/success-game-view";
import HeaderView from "../views/header-view";
import initTimer from "./timer";

export default class Game {

  constructor() {
    this._currentState = InitialGameState;
    this.userData = [];

  }

  _setNextLevel() {
    const level = Levels[this._currentState.level];

    const headerData = {
      timer: initTimer(GameData.allTime),
      mistakes: GameData.mistakes
    };
    const headerView = new HeaderView(headerData);


    if (level.type === GAME_TYPE.ARTIST) {
      this._setLevelScreen(new LevelArtistView(level.info, headerView.element));
    } else if (level.type === GAME_TYPE.GENRE) {
      this._setLevelScreen(new LevelGenreView(level.info, headerView.element));
    }
  }

  _setLevelScreen(levelView) {
    levelView.onAnswerBtnClick = (answer) => this.checkAnswer(answer);
    this.setScreen(levelView.element);
  }

  _setResultScreen(view) {
    view.onReplayBtnClick = () => this.startGame();
    this.setScreen(view.element);
  }

  _prepareResultData() {
    const score = getPlayerScore(this.userData);
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
  }

  startGame() {
    this._currentState.level = 0;
    this._setNextLevel();
  }

  setScreen(viewElement) {
    if (!this._app) {
      this._app = document.querySelector(`.app`);
    }
    this._app.replaceChild(viewElement, document.querySelector(`.main`));
  }

  checkAnswer(answer) {
    this.userData.push(answer);
    this._currentState.level++;
    if (answer.answered) {
      if (this._currentState.level === GameData.questionsQuantity - 1) {
        const resultData = this._prepareResultData();
        this._setResultScreen(new SuccessGameView(resultData));
        return;
      }
    } else {
      if (++GameData.mistakes === GameData.maxLifes) {
        this._setResultScreen(new FailedGameView(FailedData.attemptsEnded));
        return;
      }
    }

    this._setNextLevel();
  }
}
