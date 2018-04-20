import {getElement, setScreen} from '../utils.js';
import screenWelcome from './screen-welcome.js';
import getLogoTemplate from '../templates/logo.js';

export default (data) => {
  const contentTemplate = `<section class="main main--result">
                            ${getLogoTemplate()}
                            <h2 class="title">${data.title}</h2>
                            <div class="main-stat">${data.text}</div>
                            <span role="button" tabindex="0" class="main-replay">${data.buttonText}</span>
                          </section>`;

  const screenFailedGame = getElement(contentTemplate);
  const replayBtn = screenFailedGame.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    setScreen(screenWelcome);
  });

  return screenFailedGame;

};
