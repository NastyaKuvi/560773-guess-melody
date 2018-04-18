let time = 0;

const initTimer = (newTime) => {
  if (typeof newTime !== `number`) {
    throw new Error(`time should be type of number`);
  }

  if (newTime < 0) {
    throw new Error(`time should be a positive number`);
  }

  time = newTime;
  return timer;
};

const pad = (digit) => {
  return digit <= 9 ? `0` + digit : digit;
};

const timer = {
  tick() {
    if (time === 0) {
      return false;
    }
    return --time;
  },
  getMinutes() {
    return pad(Math.floor(time / 60));
  },
  getSeconds() {
    return pad(time % 60);
  },
  getCurrentTime() {
    return `${this.getMinutes()}:${this.getSeconds()}`;
  }
};

export default initTimer;
