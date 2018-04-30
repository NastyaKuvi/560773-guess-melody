import FailedGameView from "../views/failed-game-view";
import {FailedData, GameData} from "../data/game-data";
import SuccessGameView from "../views/success-game-view";
import {getPlayerScore, displayPlayerScore} from "../data/game-result.js";
import {getMinutes, getSeconds} from "../utils";

export default class ResultService {
  constructor(model, userData) {
    this._model = model;
    this._userData = userData;
  }

  init(cb) {
    this._view = this.setResultView();
    this._view.onReplayBtnClick = () => cb();
  }

  setResultView() {
    if (this._model.isGameOver()) {
      return new FailedGameView(FailedData.attemptsEnded);
    }

    if (this._model.isTimeEnded()) {
      return new FailedGameView(FailedData.timeOver);
    }

    return new SuccessGameView(this._prepareResultData());
  }

  _prepareResultData() {
    const lifes = GameData.maxLifes - this._model.currentState.mistakes;
    const time = GameData.allTime - this._model.currentState.time;
    const score = getPlayerScore(this._userData, lifes);
    const result = {
      minutes: getMinutes(time),
      seconds: getSeconds(time),
      score: score.common,
      fastQ: score.fast,
      mistakes: this._model.currentState.mistakes,
      toDisplay: displayPlayerScore([2, 4, 6, 8, 10, 12],
          {lifes, points: score.common})
    };
    return result;
  }

  get element() {
    return this._view.element;
  }
}
