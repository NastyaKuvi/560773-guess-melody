import getLogoTemplate from '../templates/logo.js';
import {getCorrectNounForm} from '../utils.js';
import ResultView from "./result-view";

export default class SuccessGameView extends ResultView {
  constructor() {
    super({});
  }

  get template() {
    return `<section class="main main--result">
              ${getLogoTemplate()}
              <div class="result-container">
                <h2 class="title">Результаты загружаются</h2>
              </div>
              <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
            </section>`;
  }

  showResults(data) {
    const mainElement = this.element.querySelector(`.result-container`);
    mainElement.innerHTML =
            `<h2 class="title">Вы настоящий меломан!</h2>
            <div class="main-stat">За&nbsp; ${getCorrectNounForm(`минуты`, data.minutes)} и ${getCorrectNounForm(`секунд`, data.seconds)}
              <br>вы&nbsp;набрали ${data.score} баллов (${data.fastQ} быстрых)
              <br>совершив ${data.mistakes} ошибки</div>
            <span class="main-comparison">${data.toDisplay}</span>
          `;
  }
}
