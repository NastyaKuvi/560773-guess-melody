import AbstractView from "./abstract-view";
import getPlayerTemplate from '../templates/player-wrapper.js';
import getArtistAnswerTemplate from '../templates/artist-answer.js';
import {createElement} from "../utils";

export default class LevelArtistView extends AbstractView {

  constructor(levelData, header) {
    super();
    this._data = levelData;
    this._headerView = header;
    this._levelContainerElement = createElement(`section`);
    this._levelContainerElement.classList.add(...[`main`, `main--level`, `main--level-artist`]);
    this._levelContainerElement.appendChild(this._headerView);
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

  get element() {
    this._levelContainerElement.appendChild(super.element);
    return this._levelContainerElement;
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
