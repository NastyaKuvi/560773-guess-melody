import {Levels, LevelType, GameData} from "../data/game-data.js";
import LevelArtistView from "../views/level-artist-view.js";
import LevelGenreView from "../views/level-genre-view.js";
import Timer from "../data/timer.js";
import {setScreen} from "../utils.js";

export default class GameService {

  constructor(model) {
    this._userData = [];
    this._gameModel = model;
    this._app = document.querySelector(`.app`);
  }

  get element() {
    return this._view.element;
  }

  initTimer() {
    this._timer = new Timer(GameData.allTime);
  }

  init(cb) {
    this._gameModel.initState();
    this.initTimer();
    this.start();
    this._resultCallBack = cb;
  }

  updateHeader() {
    this._headerData.mistakes = this._gameModel.currentState.mistakes;
    if (this._view) {
      this._view.updateHeader(this._headerData);
    }
  }

  _setNextLevel() {
    this.updateHeader();
    const level = Levels[this._gameModel.currentState.level - 1];

    if (level.type === LevelType.ARTIST) {
      this._setLevelScreen(new LevelArtistView(level.info, this._headerData));
    } else if (level.type === LevelType.GENRE) {
      this._setLevelScreen(new LevelGenreView(level.info, this._headerData));
    }
  }

  _setLevelScreen(levelView) {
    levelView.onAnswerBtnClick = (answered) => this.checkAnswer(answered);
    this._view = levelView;
  }

  start() {
    this._headerData = {
      timer: this._timer,
      mistakes: this._gameModel.currentState.mistakes
    };
    this._setNextLevel();
    this.setInterval();
  }

  stop() {
    this.pause();
    this._resultCallBack(this._gameModel, this._userData);
  }

  pause() {
    clearInterval(this._interval);
  }

  resume() {
    if (this._gameModel.canContinue()) {
      this._gameModel.nextLevel();
      this.setInterval();
      this._setNextLevel();
      setScreen(this._app, this._view.element);
    } else {
      this.stop();
    }

  }

  setInterval() {
    this._interval = setInterval(() => {
      if (!this._timer.tick()) {
        this._gameModel.time = this._timer.getCurrentTime();
        this.stop();
      }
      this.updateHeader();
    }, 1000);
  }

  checkAnswer(answered) {
    this.pause();

    const curtime = this._timer.getCurrentTime();
    this._userData.push({answered, time: this._gameModel.currentState.time - curtime});
    this._gameModel.time = curtime;

    if (!answered) {
      this._gameModel.increaseMistakes();
    }

    this.resume();
  }
}
