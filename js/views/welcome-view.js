import AbstractView from "./abstract-view";
import {getCorrectNounForm, DeclensionWords} from '../data/noun-declension.js';
import getLogoTemplate from '../templates/logo.js';

/**
 * Class presents welcome view.
 */
export default class WelcomeView extends AbstractView {

  constructor(welcomeData) {
    super();
    this._welcomeData = welcomeData;
  }

  get template() {
    return `<section class="main main--welcome">
                            ${getLogoTemplate()}
                            <button class="main-play">Начать игру</button>
                            <h2 class="title main-title">Правила игры</h2>
                            <p class="text main-text">
                              Правила просты&nbsp;— за&nbsp; ${getCorrectNounForm(DeclensionWords.MINUTES, this._welcomeData.gameTime)} ответить на все вопросы.<br>
                              Ошибиться можно ${getCorrectNounForm(DeclensionWords.COUNT, this._welcomeData.maxMistakesCount)}.<br>
                              Удачи!
                            </p>
                          </section>`;
  }

  bind() {
    const playBtn = this.element.querySelector(`.main-play`);
    playBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onStartGameBtnClick();
    });
  }

  /**
   * Handler for click on start game button
   */
  onStartGameBtnClick() {
  }
}
