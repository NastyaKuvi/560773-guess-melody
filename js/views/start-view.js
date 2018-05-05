import AbstractView from "./abstract-view";

export default class StartView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="main">
              <h2 class="title">Игра загружается...</h2>
              <span class="main-comparison">Пожалуйста подождите</span>
            </section>`;
  }
}
