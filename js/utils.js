
const app = document.querySelector(`.app`);

// const KeyMap = {
//   LEFT_ARROW_KEY: `ArrowLeft`,
//   RIGHT_ARROW_KEY: `ArrowRight`
// };

const getElement = (templateStr) => {
  let template = document.createElement(`template`);
  template.innerHTML = templateStr;
  return template.content.firstChild;
};

const setNextScreen = (screen) => {
  app.replaceChild(screen, document.querySelector(`.main`));
};

const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomItem = (array) => {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
};

export {
  getElement,
  setNextScreen,
  getRandomItem
};
