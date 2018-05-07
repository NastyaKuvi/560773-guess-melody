import AbstractView from "./abstract-view";

export default class AudioPlayerView extends AbstractView {
  constructor(audio, autoplay = false) {
    super();
    this._audio = audio;
    this._autoplay = autoplay ? `autoplay` : ``;
  }

  get template() {
    const isPlayingClass = !this._autoplay ? `play` : `pause`;
    return `<div class="player-wrapper">
              <div class="player">
                <audio src="${this._audio}" ${this._autoplay}></audio>
                <button class="player-control player-control--${isPlayingClass}"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>`;
  }

  bind() {
    const playBtn = this.element.querySelector(`.player-control`);
    const audio = this.element.querySelector(`audio`);
    playBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._stopAllAudios(audio);

      if (!audio.paused) {
        audio.pause();
      } else {
        audio.play();
      }

      this._togglePlayButton(playBtn);
    });
  }

  _togglePlayButton(btn) {
    btn.classList.toggle(`player-control--play`);
    btn.classList.toggle(`player-control--pause`);
  }
  _stopAllAudios(current) {
    if (!this._audios) {
      this._audios = [...document.querySelectorAll(`audio`)];
    }
    this._audios.forEach((item) => {
      if (!item.paused && item !== current) {
        item.pause();
        item.currentTime = 0;
        this._togglePlayButton(item.nextElementSibling);
      }
    });
  }
}
