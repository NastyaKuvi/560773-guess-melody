import {getElement, setNextScreen, getRandomItem} from './utils.js';
import screenResultSuccess from './screen-result-success.js';
import screenResultAttemptsEnded from './screen-attempts-ended.js';
import screenResultTimeOver from './screen-attempts-timeover.js';

const INNERHTML = `<section class="main main--level main--level-genre">
                      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
                        <circle
                          cx="390" cy="390" r="370"
                          class="timer-line"
                          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

                        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
                          <span class="timer-value-mins">05</span><!--
                          --><span class="timer-value-dots">:</span><!--
                          --><span class="timer-value-secs">00</span>
                        </div>
                      </svg>
                      <div class="main-mistakes">
                        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
                        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
                        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
                      </div>

                      <div class="main-wrap">
                        <h2 class="title">Выберите инди-рок треки</h2>
                        <form class="genre">
                          <div class="genre-answer">
                            <div class="player-wrapper">
                              <div class="player">
                                <audio></audio>
                                <button class="player-control player-control--pause"></button>
                                <div class="player-track">
                                  <span class="player-status"></span>
                                </div>
                              </div>
                            </div>
                            <input type="checkbox" name="answer" value="answer-1" id="a-1">
                            <label class="genre-answer-check" for="a-1"></label>
                          </div>

                          <div class="genre-answer">
                            <div class="player-wrapper">
                              <div class="player">
                                <audio></audio>
                                <button class="player-control player-control--play"></button>
                                <div class="player-track">
                                  <span class="player-status"></span>
                                </div>
                              </div>
                            </div>
                            <input type="checkbox" name="answer" value="answer-1" id="a-2">
                            <label class="genre-answer-check" for="a-2"></label>
                          </div>

                          <div class="genre-answer">
                            <div class="player-wrapper">
                              <div class="player">
                                <audio></audio>
                                <button class="player-control player-control--play"></button>
                                <div class="player-track">
                                  <span class="player-status"></span>
                                </div>
                              </div>
                            </div>
                            <input type="checkbox" name="answer" value="answer-1" id="a-3">
                            <label class="genre-answer-check" for="a-3"></label>
                          </div>

                          <div class="genre-answer">
                            <div class="player-wrapper">
                              <div class="player">
                                <audio></audio>
                                <button class="player-control player-control--play"></button>
                                <div class="player-track">
                                  <span class="player-status"></span>
                                </div>
                              </div>
                            </div>
                            <input type="checkbox" name="answer" value="answer-1" id="a-4">
                            <label class="genre-answer-check" for="a-4"></label>
                          </div>

                          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
                        </form>
                      </div>
                      </section>`;

const screenLevelGenre = getElement(INNERHTML);
const answerCheckboxes = screenLevelGenre.querySelectorAll(`input[type=checkbox]`);
const answerBtn = screenLevelGenre.querySelector(`.genre-answer-send`);

const screens = [screenResultSuccess, screenResultAttemptsEnded, screenResultTimeOver];

const isSomeAnswerChecked = () => {
  let result = false;
  answerCheckboxes.forEach((element) => {
    if (element.checked) {
      result = true;
      return;
    }
  });
  return result;
};

const resetScreen = () => {
  answerCheckboxes.forEach((element) => {
    element.checked = false;
  });
  answerBtn.setAttribute(`disabled`, true);
};

answerBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  setNextScreen(getRandomItem(screens));
  resetScreen();
});

answerCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener(`click`, () => {
    if (checkbox.checked) {
      answerBtn.removeAttribute(`disabled`);
    } else if (!isSomeAnswerChecked()) {
      answerBtn.setAttribute(`disabled`, true);
    }
  });
});

export default screenLevelGenre;
