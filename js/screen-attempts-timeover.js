import {getElement, setNextScreen} from './utils.js';
import screenWelcome from './screen-welcome.js';

const INNERHTML = `<section class="main main--result">
                    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

                    <h2 class="title">Увы и ах!</h2>
                    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
                    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
                    </section>`;

const screenResultTimeOver = getElement(INNERHTML);
const replayBtn = screenResultTimeOver.querySelector(`.main-replay`);

replayBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  setNextScreen(screenWelcome);
});

export default screenResultTimeOver;
