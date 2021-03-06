import getArtistAnswerTemplate from '../templates/artist-answer.js';
import LevelView from "./level-view";
import AudioPlayerView from './player-view.js';

export default class LevelArtistView extends LevelView {

  constructor(levelData, headerData) {
    super(headerData, `main--level-artist`);
    this._data = levelData;
  }

  get template() {
    return `<div class="main-wrap">
                <h2 class="title main-title">${this._data.title}</h2>
                <div class="player-wrapper-template"></div>
                <form class="main-list">
                ${this._data.answers.map((item, index) => getArtistAnswerTemplate(item, index)).join(``)}
                </form>
              </div>`;
  }


  bind() {
    const answerBtns = this.element.querySelectorAll(`.main-answer-r`);

    answerBtns.forEach((btn) => {
      btn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const userAnswer = +btn.value.trim();
        this.onAnswerBtnClick(this._data.right === userAnswer);
      });
    });

    this.addAudio(this.element.querySelector(`.main-wrap`), new AudioPlayerView(this._data.audio, true).element);
  }

  onAnswerBtnClick() {
  }
}
