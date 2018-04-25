import getLogoTemplate from '../templates/logo.js';
import {getCorrectNounForm} from '../utils.js';
import ResultView from "./result-view";

export default class SuccessGameView extends ResultView {
  constructor(data) {
    super(data);
  }

  get template() {
    return `<section class="main main--result">
              ${getLogoTemplate()}
              <h2 class="title">Вы настоящий меломан!</h2>
              <div class="main-stat">За&nbsp; ${getCorrectNounForm(`минуты`, this.data.minutes)} и ${getCorrectNounForm(`секунд`, this._data.seconds)}
                <br>вы&nbsp;набрали ${this.data.score} баллов (${this.data.fastQ} быстрых)
                <br>совершив ${this.data.mistakes} ошибки</div>
              <span class="main-comparison">${this.data.toDisplay}</span>
              <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
            </section>`;
  }
}
