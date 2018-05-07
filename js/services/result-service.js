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

  get element() {
    return this._view.element;
  }

  init(cb, errorCb) {
    this._errorCb = errorCb;

    this._view = this._setResultView();
    this._view.onReplayBtnClick = () => cb();

  }

  _setResultView() {
    if (this._model.isGameOver()) {
      return new FailedGameView(FailedData.attemptsEnded);
    }

    if (this._model.isTimeEnded()) {
      return new FailedGameView(FailedData.timeOver);
    }

    return this._showResultView();
  }

  _showResultView() {
    const successView = new SuccessGameView();
    this._prepareResultData(successView);

    return successView;
  }

  async _prepareResultData(view) {
    const result = {
      lifes: GameData.maxLifes - this._model.currentState.mistakes,
      time: GameData.allTime - this._model.currentState.time,
      answers: this._userData
    };

    try {
      await Loader.saveResult(result);
      view.showResults(this._calculatePlayerStatistic(await Loader.getStatistic()));
    } catch (e) {
      this.errorCb(e);
    }
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
}
