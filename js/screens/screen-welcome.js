import {getElement, getCorrectNounForm} from '../utils.js';
import getLogoTemplate from '../templates/logo.js';
import {startGame} from '../data/game-service.js';

export default (welcomeData) => {
  const welcomeTemplate = `<section class="main main--welcome">
                            ${getLogoTemplate()}
                            <button class="main-play">Начать игру</button>
                            <h2 class="title main-title">Правила игры</h2>
                            <p class="text main-text">
                              Правила просты&nbsp;— за&nbsp; ${getCorrectNounForm(`минута`, welcomeData.gameTime)} ответить на все вопросы.<br>
                              Ошибиться можно ${getCorrectNounForm(`раз`, welcomeData.maxMistakesCount)}.<br>
                              Удачи!
                            </p>
                          </section>`;

  const screenWelcome = getElement(welcomeTemplate);
  const playBtn = screenWelcome.querySelector(`.main-play`);

  playBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    startGame();
  });

  return screenWelcome;
};
