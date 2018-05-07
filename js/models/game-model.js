import {InitialGameState, GameData} from "../data/game-data";

export default class GameModel {
  constructor(levelsData) {
    this._levelsData = levelsData;
    this.initState();
  }

  get currentState() {
    return this._currentState;
  }

  get currentLevelInfo() {
    return this._levelsData[this._currentState.level - 1];
  }

  set time(newTime) {
    this._currentState.time = newTime;
  }

  initState() {
    this._currentState = Object.assign({}, InitialGameState);
  }

  nextLevel() {
    if (this.hasNextLevel()) {
      this._currentState.level++;
    }
  }

  hasNextLevel() {
    return this._currentState.level < GameData.questionsQuantity;
  }

  increaseMistakes() {
    this._currentState.mistakes++;
  }

  isGameOver() {
    return this._currentState.mistakes >= GameData.maxLifes;
  }

  isTimeEnded() {
    return this._currentState.time <= 0;
  }

  canContinue() {
    return this.hasNextLevel() && !this.isGameOver() && !this.isTimeEnded();
  }
}
