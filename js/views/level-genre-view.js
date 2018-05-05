import getGenreAnswerTemplate from '../templates/genre-answer.js';
import LevelView from './level-view.js';
import AudioPlayerView from './player-view.js';

export default class LevelGenreView extends LevelView {

  constructor(levelData, headerData) {
    super(headerData, `main--level-genre`);
    this._data = levelData;
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
      this.onAnswerBtnClick(this._isAnswered(answerCheckboxes));
      this.resetScreen(answerCheckboxes, answerBtn);
    });

    answerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener(`click`, () => {
        answerBtn.disabled = !(checkbox.checked || this.isSomeAnswerChecked(answerCheckboxes));
      });
    });

    const answerElements = this.element.querySelectorAll(`.genre-answer`);
    for (let i = 0; i < this._data.answers.length; i++) {
      this.addAudio(answerElements[i], new AudioPlayerView(this._data.answers[i].audio).element);
    }
  }

  onAnswerBtnClick() {
  }
}
