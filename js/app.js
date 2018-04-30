import GameModel from "./models/game-model";
import GameService from "./services/game-service";
import WelcomeService from "./services/welcome-service";
import {setScreen} from "./utils";
import ResultService from "./services/result-service";

const app = document.querySelector(`.app`);

export default class Application {
  static showWelcome() {
    const welcomeService = new WelcomeService();
    welcomeService.init(this.showGame.bind(this));

    setScreen(app, welcomeService.element);
  }

  static showGame() {
    const model = new GameModel();
    const gameService = new GameService(model);
    gameService.init(this.showResult.bind(this));
    setScreen(app, gameService.element);
  }

  static showResult(model, userData) {
    const resultService = new ResultService(model, userData);
    resultService.init(this.showGame.bind(this));

    setScreen(app, resultService.element);
  }
}
