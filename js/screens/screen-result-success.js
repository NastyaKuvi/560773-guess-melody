import {getElement, getCorrectNounForm} from '../utils.js';
import getLogoTemplate from '../templates/logo.js';
import {startGame} from '../data/game-service.js';

export default (resultData) => {
  const content = `<section class="main main--result">
                      ${getLogoTemplate()}
                      <h2 class="title">Вы настоящий меломан!</h2>
                      <div class="main-stat">За&nbsp; ${getCorrectNounForm(`минуты`, resultData.minutes)} и ${getCorrectNounForm(`секунд`, resultData.seconds)}
                        <br>вы&nbsp;набрали ${resultData.score} баллов (${resultData.fastQ} быстрых)
                        <br>совершив ${resultData.mistakes} ошибки</div>
                      <span class="main-comparison">${resultData.toDisplay}</span>
                      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
                      </section>`;

  const screenResultSuccess = getElement(content);
  const replayBtn = screenResultSuccess.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    startGame();
  });

  return screenResultSuccess;
};
