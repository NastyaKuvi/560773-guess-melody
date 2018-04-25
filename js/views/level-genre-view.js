import getGenreAnswerTemplate from '../templates/genre-answer.js';
import AbstractView from "./abstract-view";
import {createElement} from '../utils.js';

export default class LevelGenreView extends AbstractView {

  constructor(levelData, header) {
    super();
    this._data = levelData;
    this._headerView = header;
    this._levelContainerElement = createElement(`section`);
    this._levelContainerElement.classList.add(...[`main`, `main--level`, `main--level-genre`]);
    this._levelContainerElement.appendChild(this._headerView);
  }

  get template() {
    return `<div class="main-wrap">
                <h2 class="title">${this._data.title}</h2>
                <form class="genre">
                ${this._data.answers.map((item, index) => getGenreAnswerTemplate(item, index + 1)).join(``)}
                  <button class="genre-answer-send" type="submit" disabled>Ответить</button>
                </form>
              </div>`;
  }

  get element() {
    this._levelContainerElement.appendChild(super.element);
    return this._levelContainerElement;
  }

  _isAnswered(checkboxes) {
    const answered = checkboxes.filter((item) => item.checked)
        .map((item) => this._data.answers[item.value.trim() - 1]);
    const rightAnswers = this._data.answers.filter((answer) => answer.right);

    if (answered.length !== rightAnswers.length) {
      return false;
    }

    return answered.every((answer) => answer.right);
  }

  isSomeAnswerChecked(checkboxes) {
    return checkboxes.some((element) => element.checked);
  }

  resetScreen(checkboxes, answerBtn) {
    checkboxes.forEach((element) => {
      element.checked = false;
    });
    answerBtn.disabled = true;
  }

  bind() {
    const answerCheckboxes = [...this.element.querySelectorAll(`input[type=checkbox]`)];
    const answerBtn = this.element.querySelector(`.genre-answer-send`);
    answerBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const answered = this._isAnswered(answerCheckboxes);
      this.onAnswerBtnClick({answered, time: 30});
      this.resetScreen(answerCheckboxes, answerBtn);
    });

    answerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener(`click`, () => {
        answerBtn.disabled = !(checkbox.checked || this.isSomeAnswerChecked(answerCheckboxes));
      });
    });
  }

  onAnswerBtnClick() {
  }
}
