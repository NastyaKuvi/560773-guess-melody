import GameModel from "./models/game-model";
import GameService from "./services/game-service";
import WelcomeService from "./services/welcome-service";
import {setScreen} from "./utils";
import ResultService from "./services/result-service";
import Loader from "./loader";
import ErrorView from "./views/error-view";
import StartView from "./views/start-view";

const app = document.querySelector(`.app`);
let levelsData;

export default class Application {

  static async start() {
    const startView = new StartView();
    setScreen(app, startView.element);
    try {
      Application.showWelcome(await Loader.loadData());
    } catch (e) {
      Application.showError(e);
    }
  }

  static showWelcome(data) {
    levelsData = data;
    const welcomeService = new WelcomeService();
    welcomeService.init(Application.showGame);

    setScreen(app, welcomeService.element);
  }

  static showGame() {
    const model = new GameModel(levelsData);
    const gameService = new GameService(model);
    gameService.init(Application.showResult);
    setScreen(app, gameService.element);
  }

  static showResult(model, userData) {
    const resultService = new ResultService(model, userData);
    resultService.init(Application.showGame, Application.showError);

    setScreen(app, resultService.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    setScreen(app, errorView.element);
  }
}
