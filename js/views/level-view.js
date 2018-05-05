import AbstractView from "./abstract-view";
import HeaderView from "./header-view";
import {createElement} from "../utils";

export default class LevelView extends AbstractView {
  constructor(headerData, containerClass) {
    super();
    this._headerView = new HeaderView(headerData);
    this._levelContainerElement = createElement(`section`);
    this._levelContainerElement.classList.add(...[`main`, `main--level`, containerClass]);
    this._levelContainerElement.appendChild(this._headerView.element);

  }

  get element() {
    this._levelContainerElement.appendChild(super.element);
    return this._levelContainerElement;
  }

  updateHeader(data) {
    const header = new HeaderView(data);
    this._levelContainerElement.replaceChild(header.element, this._headerView.element);
    this._headerView = header;
  }

  addAudio(parent, audioElement) {
    const oldAudioElem = parent.querySelector(`.player-wrapper-template`);
    parent.replaceChild(audioElement, oldAudioElem);
  }
}
