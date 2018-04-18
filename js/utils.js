// const KeyMap = {
//   LEFT_ARROW_KEY: `ArrowLeft`,
//   RIGHT_ARROW_KEY: `ArrowRight`
// };

const getElement = (templateStr) => {
  let template = document.createElement(`template`);
  template.innerHTML = templateStr;
  return template.content.firstChild;
};

const setScreen = (screen) => {
  const app = document.querySelector(`.app`);
  app.replaceChild(screen, document.querySelector(`.main`));
};

const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomItem = (array) => {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
};

const replaceArrayItems = (array, index1, index2) => {
  let item = array[index1];
  array[index1] = array[index2];
  array[index2] = item;
};

const shuffleArray = (array) => {
  const resArray = [...array];
  for (let i = 0; i < resArray.length; i++) {
    const rand = getRandomNumber(i, resArray.length - 1);
    replaceArrayItems(resArray, rand, i);
  }
  return resArray;
};

const getCorrectNounForm = (noun, number) => {
  // TODO: implement this
  return `${number} ${noun}`;
};

const getMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

export {
  getElement,
  setScreen,
  getRandomItem,
  getCorrectNounForm,
  getMinutes,
  shuffleArray
};
