import {Levels, GAME_TYPE, GameData, FailedData, InitialGameState} from "./game-data";
import {getPlayerScore, displayPlayerScore} from "./game-result";
import LevelArtistView from "../views/level-artist-view";
import LevelGenreView from "../views/level-genre-view";
import FailedGameView from "../views/failed-game-view";
import SuccessGameView from "../views/success-game-view";
import {createElement} from "../utils";
import HeaderView from "../views/header-view";
import initTimer from "./timer";

export default class Game {

  constructor() {
    this._currentState = InitialGameState;
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
      mistakes: GameData.mistakes
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
