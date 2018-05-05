import FailedGameView from "../views/failed-game-view";
import {FailedData, GameData} from "../data/game-data";
import SuccessGameView from "../views/success-game-view";
import {getPlayerScore, displayPlayerScore} from "../data/game-result.js";
import {getMinutes, getSeconds} from "../utils";
import Loader from "../loader";

export default class ResultService {
  constructor(model, userData) {
    this._model = model;
    this._userData = userData;
  }

  init(cb, errorCb) {
    this._errorCb = errorCb;

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

    return this._prepareResultData();
  }

  _prepareResultData() {
    const result = {
      lifes: GameData.maxLifes - this._model.currentState.mistakes,
      time: GameData.allTime - this._model.currentState.time,
      answers: this._userData
    };

    const successView = new SuccessGameView();
    Loader.saveResult(result)
        .then(Loader.getStatistic)
        .then((data) => this._calculatePlayerStatistic(data))
        .then((data) => successView.showResults(data))
        .catch(this._errorCb);

    return successView;
  }

  _calculatePlayerStatistic(data) {
    const playerData = data.pop();
    const otherPlayers = data.map((player) => getPlayerScore(player.answers, player.lifes).common);

    const score = getPlayerScore(playerData.answers, playerData.lifes);
    return {
      minutes: getMinutes(playerData.time),
      seconds: getSeconds(playerData.time),
      score: score.common,
      fastQ: score.fast,
      mistakes: GameData.maxLifes - playerData.lifes,
      toDisplay: displayPlayerScore(otherPlayers,
          {lifes: playerData.lifes, points: score.common})
    };
  }

  get element() {
    return this._view.element;
  }
}
