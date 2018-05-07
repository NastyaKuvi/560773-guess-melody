import {getMinutes, getSeconds} from "../utils";

export default class Timer {
  constructor(time = 0) {
    this.init(time);
  }

  get minutes() {
    return getMinutes(this._time);
  }

  get seconds() {
    return getSeconds(this._time);
  }

  get currentTime() {
    return this._time;
  }

  init(newTime) {
    if (typeof newTime !== `number`) {
      throw new Error(`time should be type of number`);
    }

    if (newTime < 0) {
      throw new Error(`time should be a positive number`);
    }

    this._time = newTime;
  }

  tick() {
    if (this._time === 0) {
      return false;
    }
    return --this._time;
  }

  isTimerOnFinish() {
    return this._time <= 30;
  }

}
