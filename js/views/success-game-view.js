import getLogoTemplate from '../templates/logo.js';
import ResultView from "./result-view";
import {getCorrectNounForm, DeclensionWords} from '../data/noun-declension.js';

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
            <div class="main-stat">За&nbsp; ${getCorrectNounForm(DeclensionWords.MINUTES, data.minutes)} и ${getCorrectNounForm(DeclensionWords.SECONDS, data.seconds)}
              <br>вы&nbsp;набрали ${getCorrectNounForm(DeclensionWords.SCORE, data.score)} (${data.fastQ} быстрых)
              <br>совершив ${getCorrectNounForm(DeclensionWords.MISTAKE, data.mistakes)}</div>
            <span class="main-comparison">${data.toDisplay}</span>
          `;
  }
}
