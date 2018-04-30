import {InitialGameState, GameData} from "../data/game-data";

export default class GameModel {
  constructor() {
    this.initState();
    // Empty
  }

  initState() {
    this._currentState = Object.assign({}, InitialGameState);
  }

  get currentState() {
    return this._currentState;
  }

  set time(newTime) {
    this._currentState.time = newTime;
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