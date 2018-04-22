import AbstractView from "./abstract-view";
import getPlayerTemplate from '../templates/player-wrapper.js';
import getArtistAnswerTemplate from '../templates/artist-answer.js';

export default class LevelArtistView extends AbstractView {

  constructor(levelData) {
    super();
    this._data = levelData;
  }

  get template() {
    return `<div class="main-wrap">
                <h2 class="title main-title">${this._data.title}</h2>
                ${getPlayerTemplate(this._data.audio)}
                <form class="main-list">
                ${this._data.answers.map((item, index) => getArtistAnswerTemplate(item, index + 1)).join(``)}
                </form>
              </div>`;
  }

  bind() {
    const answerBtns = this.element.querySelectorAll(`.main-answer-r`);

    answerBtns.forEach((btn) => {
      btn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const userAnswer = +btn.value.trim();
        this.onAnswerBtnClick({answered: this._data.right === userAnswer, time: 30});
      });
    });
  }

  onAnswerBtnClick() {
  }
}
