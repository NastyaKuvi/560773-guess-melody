import AbstractView from "./abstract-view";

export default class StartView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="main main--welcome">
              <h2 class="title main-title">Игра загружается...</h2>
              <span class="text main-text">Пожалуйста подождите</span>
            </section>`;
  }
}
