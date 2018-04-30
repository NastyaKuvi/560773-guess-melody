import {getMinutes, getSeconds} from "../utils";

export default class Timer {
  constructor(time = 0) {
    this.init(time);
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

  getMinutes() {
    return getMinutes(this._time);
  }

  getSeconds() {
    return getSeconds(this._time);
  }

  getCurrentTime() {
    return this._time;
  }

}
