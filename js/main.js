import getScreenWelcome from './screens/screen-welcome.js';
import {setScreen, getMinutes} from './utils.js';
import {GameData} from './data/game-data.js';

const welcome = {
  gameTime: getMinutes(GameData.allTime),
  maxMistakesCount: GameData.maxLifes
};
setScreen(getScreenWelcome(welcome));
