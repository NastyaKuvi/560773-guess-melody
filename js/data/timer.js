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

const timer = {
  tick() {
    if (time > 0) {
      time--;
      return time;
    } else {
      return `Время вышло`;
    }
  },
};

export default initTimer;
