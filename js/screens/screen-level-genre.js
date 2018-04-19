import {getElement} from '../utils.js';
import getHeaderTemplate from '../templates/header.js';
import getGenreAnswerTemplate from '../templates/genre-answer.js';
import {GameData} from '../data/game-data.js';
import initTimer from '../data/timer.js';
import {checkAnswer} from '../data/game-service.js';

export default (levelGenreData) => {
  const headerData = {
    timer: initTimer(GameData.allTime),
    mistakes: GameData.mistakes
  };
  const content = `<section class="main main--level main--level-genre">
    ${getHeaderTemplate(headerData)}
    <div class="main-wrap">
      <h2 class="title">${levelGenreData.title}</h2>
      <form class="genre">
      ${levelGenreData.answers.map((item, index) =>
        getGenreAnswerTemplate(item, index + 1)).join(``)}
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;

  const screenLevelGenre = getElement(content);
  const answerCheckboxes = [...screenLevelGenre.querySelectorAll(`input[type=checkbox]`)];
  const answerBtn = screenLevelGenre.querySelector(`.genre-answer-send`);

  const isSomeAnswerChecked = () => {
    return answerCheckboxes.some((element) => element.checked);
  };

  const resetScreen = () => {
    answerCheckboxes.forEach((element) => {
      element.checked = false;
    });
    answerBtn.disabled = true;
  };

  answerBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const answered = answerCheckboxes
        .filter((item) => item.checked)
        .map((item) => levelGenreData.answers[item.value.trim() - 1])
        .every((answer) => answer.right);
    checkAnswer({answered, time: 30});
    resetScreen();
  });

  answerCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener(`click`, () => {
      answerBtn.disabled = !(checkbox.checked || isSomeAnswerChecked());
    });
  });

  return screenLevelGenre;
};
