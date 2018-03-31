
const KeyMap = {
  LEFT_ARROW_KEY: `ArrowLeft`,
  RIGHT_ARROW_KEY: `ArrowRight`
};

const screensContainer = document.querySelector(`#templates`).content;
const welcomeScreen = screensContainer.querySelector(`.main--welcome`);
const levelScreens = screensContainer.querySelectorAll(`.main--level`);
const resultScreens = screensContainer.querySelectorAll(`.main--result`);
const app = document.querySelector(`.app`);

let currentIndex = 0;

const screensMap = Array.prototype.concat(
    welcomeScreen,
    Array.prototype.slice.call(levelScreens),
    Array.prototype.slice.call(resultScreens));

const setNextScreen = (i) => {
  app.replaceChild(screensMap[i], document.querySelector(`.main`));
};

document.addEventListener(`keydown`, function (evt) {
  if (evt.altKey) {
    switch (evt.key) {
      case KeyMap.LEFT_ARROW_KEY:
        if (currentIndex > 0) {
          setNextScreen(--currentIndex);
        }
        break;
      case KeyMap.RIGHT_ARROW_KEY:
        if (currentIndex < screensMap.length - 1) {
          setNextScreen(++currentIndex);
        }
        break;
      default:
        return;
    }
  }
});

setNextScreen(0);

