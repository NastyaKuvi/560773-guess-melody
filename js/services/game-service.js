import {LevelType, GameData} from "../data/game-data.js";
import LevelArtistView from "../views/level-artist-view.js";
import LevelGenreView from "../views/level-genre-view.js";
import Timer from "../data/timer.js";
import {setScreen} from "../utils.js";

export default class GameService {

  constructor(model) {
    this._userData = [];
    this._model = model;
    this._app = document.querySelector(`.app`);
  }

  get element() {
    return this._view.element;
  }

  init(cb) {
    this._model.initState();
    this._initTimer();
    this.start();
    this._resultCallBack = cb;
  }

  start() {
    this._headerData = {
      timer: this._timer,
      mistakes: this._model.currentState.mistakes
    };
    this._setNextLevel();
    this._setInterval();
  }

  stop() {
    this.pause();
    this._resultCallBack(this._model, this._userData);
  }

  pause() {
    clearInterval(this._interval);
  }

  resume() {
    if (this._model.canContinue()) {
      this._model.nextLevel();
      this._setInterval();
      this._setNextLevel();
      setScreen(this._app, this._view.element);
    } else {
      this.stop();
    }
  }

  _initTimer() {
    this._timer = new Timer(GameData.allTime);
  }

  _updateHeader() {
    this._headerData.mistakes = this._model.currentState.mistakes;
    if (this._view) {
      this._view.updateHeader(this._headerData);
    }
  }

  _setNextLevel() {
    this._updateHeader();
    const level = this._model.currentLevelInfo;

    if (level.type === LevelType.ARTIST) {
      this._setLevelScreen(new LevelArtistView(level.info, this._headerData));
    } else if (level.type === LevelType.GENRE) {
      this._setLevelScreen(new LevelGenreView(level.info, this._headerData));
    }
  }

  _setLevelScreen(levelView) {
    levelView.onAnswerBtnClick = (answered) => this._checkAnswer(answered);
    this._view = levelView;
  }

  _setInterval() {
    this._interval = setInterval(() => {
      if (!this._timer.tick()) {
        this._model.time = this._timer.currentTime;
        this.stop();
      }
      this._updateHeader();
    }, 1000);
  }

  _checkAnswer(answered) {
    this.pause();

    const curtime = this._timer.currentTime;
    this._userData.push({answered, time: this._model.currentState.time - curtime});
    this._model.time = curtime;

    if (!answered) {
      this._model.increaseMistakes();
    }

    this.resume();
  }
}
