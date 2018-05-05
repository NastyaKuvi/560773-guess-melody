import GameModel from "./models/game-model";
import GameService from "./services/game-service";
import WelcomeService from "./services/welcome-service";
import {setScreen} from "./utils";
import ResultService from "./services/result-service";
import adaptServerData from "./data/data-adapter";

const app = document.querySelector(`.app`);
let levelsData;

const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response;
};

export default class Application {

  static start() {
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
        .then(checkStatus)
        .then((response) => response.json())
        .then((data) => adaptServerData(data))
        .then(Application.showWelcome)
        .catch((error) => console.log(error));
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
    resultService.init(Application.showGame);

    setScreen(app, resultService.element);
  }
}
