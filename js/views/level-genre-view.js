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
    const answered = checkboxes.reduce((prev, curr, index) => {
      if (curr.checked) {
        prev.push(this._data.answers[index]);
      }
      return prev;
    }, []);
    const rightAnswers = this._data.answers.filter((answer) => answer.right);

    if (answered.length !== rightAnswers.length) {
      return false;
    }

    return answered.every((answer) => answer.right);
  }

  _isSomeAnswerChecked(checkboxes) {
    return checkboxes.some((element) => element.checked);
  }

  _resetScreen(checkboxes, answerBtn) {
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
      this._resetScreen(answerCheckboxes, answerBtn);
    });

    answerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener(`click`, () => {
        answerBtn.disabled = !(checkbox.checked || this._isSomeAnswerChecked(answerCheckboxes));
      });
    });

    const answerElements = this.element.querySelectorAll(`.genre-answer`);
    this._data.answers.forEach((item, index) => {
      this.addAudio(answerElements[index], new AudioPlayerView(item.audio).element);
    });
  }

  onAnswerBtnClick() {
  }
}
