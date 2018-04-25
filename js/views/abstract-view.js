import {createElement} from "../utils";

/**
 * Class represents abstract view
 */
export default class AbstractView {

  /**
   * Constructor
   */
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Instance of abstract class cannot be created`);
    }
  }

  /**
   * Returns template string for the view
   */
  get template() {
    throw new Error(`view does not contains template`);
  }

  /**
   * Creates DOM-element from template string
   * @return {Element} created element
   */
  render() {
    return createElement(`template`, this.template).content;
  }

  /**
   * Handle events for the user interaction
   */
  bind() {
    // Empty
  }

  /**
   * Returns Dom-Element
   */
  get element() {
    if (!this._domElement) {
      this._domElement = this.render();
      this.bind();
    }

    return this._domElement;
  }
}
