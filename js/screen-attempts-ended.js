import {getElement, setNextScreen} from './utils.js';
import screenWelcome from './screen-welcome.js';

const INNERHTML = `<section class="main main--result">
                    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

                    <h2 class="title">Какая жалость!</h2>
                    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
                    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
                    </section>`;

const screenResultAttemptsEnded = getElement(INNERHTML);
const replayBtn = screenResultAttemptsEnded.querySelector(`.main-replay`);

replayBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  setNextScreen(screenWelcome);
});

export default screenResultAttemptsEnded;
