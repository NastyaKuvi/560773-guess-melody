import WelcomeView from "../views/welcome-view";
import {GameData} from "../data/game-data";
import {getMinutes} from "../utils";

export default class WelcomeService {
  constructor() {
    this._welcome = {
      gameTime: getMinutes(GameData.allTime),
      maxMistakesCount: GameData.maxLifes
    };
  }

  get element() {
    return this._view.element;
  }

  init(cb) {
    this._view = new WelcomeView(this._welcome);
    this._view.onStartGameBtnClick = () => cb();
  }
}
