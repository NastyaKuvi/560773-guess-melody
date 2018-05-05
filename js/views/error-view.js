import AbstractView from "./abstract-view";

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<section class="main">
              <h2 class="title">Произошла ошибка:<br> ${this.error.message}</h2>
            </section>`;
  }
}
