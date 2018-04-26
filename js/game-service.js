import {Levels, GAME_TYPE, GameData, FailedData, InitialGameState} from "./data/game-data.js";
import {getPlayerScore, displayPlayerScore} from "./data/game-result.js";
import LevelArtistView from "./views/level-artist-view.js";
import LevelGenreView from "./views/level-genre-view.js";
import FailedGameView from "./views/failed-game-view.js";
import SuccessGameView from "./views/success-game-view.js";
import HeaderView from "./views/header-view.js";
import initTimer from "./data/timer.js";

export default class Game {

  constructor() {
    this._currentState = Object.assign({}, InitialGameState);
    this.userData = [];
  }

  _setNextLevel() {
    const level = Levels[this._currentState.level];

    const headerData = {
      timer: initTimer(this._currentState.time),
      mistakes: this._currentState.mistakes
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
      mistakes: this._currentState.mistakes,
      toDisplay: displayPlayerScore([2, 4, 6, 8, 10, 12],
          {lifes: GameData.maxLifes - this._currentState.mistakes,
            points: score.common})
    };
    return result;
  }

  startGame() {
    this._currentState = Object.assign({}, InitialGameState);
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
      if (++this._currentState.mistakes === GameData.maxLifes) {
        this._setResultScreen(new FailedGameView(FailedData.attemptsEnded));
        return;
      }
    }

    this._setNextLevel();
  }
}
