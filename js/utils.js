const setScreen = (parent, viewElement) => {
  parent.replaceChild(viewElement, document.querySelector(`.main`));
};

const createElement = (tag = `div`, templateStr = ``) => {
  const elem = document.createElement(tag);
  elem.innerHTML = templateStr.trim();
  return elem;
};

const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomItem = (array) => {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
};

const replaceArrayItems = (array, index1, index2) => {
  [array[index1], array[index2]] = [array[index2], array[index1]];
};

const shuffleArray = (array) => {
  const resArray = [...array];
  for (let i = 0; i < resArray.length; i++) {
    const rand = getRandomNumber(i, resArray.length - 1);
    replaceArrayItems(resArray, rand, i);
  }
  return resArray;
};

const pad = (digit) => {
  return digit <= 9 ? `0` + digit : digit;
};

const getSeconds = (time) => {
  return pad(time % 60);
};

const getMinutes = (time) => {
  return pad(Math.floor(time / 60));
};

export {
  setScreen,
  createElement,
  getRandomItem,
  getSeconds,
  getMinutes,
  shuffleArray
};
