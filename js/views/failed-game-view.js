import getLogoTemplate from '../templates/logo.js';
import ResultView from "./result-view";

export default class FailedGameView extends ResultView {
  constructor(data) {
    super(data);
  }

  get template() {
    return `<section class="main main--result">
              ${getLogoTemplate()}
              <h2 class="title">${this._data.title}</h2>
              <div class="main-stat">${this._data.text}</div>
              <span role="button" tabindex="0" class="main-replay">${this._data.buttonText}</span>
            </section>`;
  }
}
