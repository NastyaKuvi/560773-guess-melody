import AbstractView from "./abstract-view";

export default class ResultView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get data() {
    return this._data;
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);

    replayBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onReplayBtnClick();
    });
  }

  onReplayBtnClick() {
  }
}
