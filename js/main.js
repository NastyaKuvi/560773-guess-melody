import {getMinutes} from './utils.js';
import {GameData} from './data/game-data.js';
import WelcomeView from './views/welcome-view.js';
import Game from './game-service.js';

const welcome = {
  gameTime: getMinutes(GameData.allTime),
  maxMistakesCount: GameData.maxLifes
};

const game = new Game();

const welcomeView = new WelcomeView(welcome);
welcomeView.onStartGameBtnClick = () => game.startGame();
game.setScreen(welcomeView.element);
