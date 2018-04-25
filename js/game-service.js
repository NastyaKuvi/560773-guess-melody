import {Levels, GAME_TYPE, GameData, FailedData, InitialGameState} from "./data/game-data.js";
import {getPlayerScore, displayPlayerScore} from "./data/game-result.js";
import LevelArtistView from "./views/level-artist-view.js";
import LevelGenreView from "./views/level-genre-view.js";
import FailedGameView from "./views/failed-game-view.js";
import SuccessGameView from "./views/success-game-view.js";
import {createElement} from "./utils.js";
import HeaderView from "./views/header-view.js";
import initTimer from "./data/timer.js";

export default class Game {

  constructor() {
    this._currentState = Object.assign({}, InitialGameState);
    this.userData = [];
    this._levelContainerElement = createElement(`section`);
    this._levelContainerElement.classList.add(...`main main--level`.split(` `));
  }

  _setNextLevel() {
    const level = Levels[this._currentState.level];
    if (level.type === GAME_TYPE.ARTIST) {
      this._setLevelScreen(new LevelArtistView(level.info), level.class);
    } else if (level.type === GAME_TYPE.GENRE) {
      this._setLevelScreen(new LevelGenreView(level.info), level.class);
    }
  }

  _setLevelScreen(levelView, levelClass) {
    this._levelContainerElement.innerHTML = ``;
    this._levelContainerElement.classList.add(levelClass);

    const headerData = {
      timer: initTimer(GameData.allTime),
      mistakes: this._currentState.mistakes
    };
    const headerView = new HeaderView(headerData);
    this._levelContainerElement.appendChild(headerView.element);

    levelView.onAnswerBtnClick = (answer) => this.checkAnswer(answer);
    this._levelContainerElement.appendChild(levelView.element);
    this.setScreen(this._levelContainerElement);
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
