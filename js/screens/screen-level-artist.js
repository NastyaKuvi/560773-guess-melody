import {getElement} from '../utils.js';
import getHeaderTemplate from "../templates/header.js";
import getPlayerTemplate from '../templates/player-wrapper.js';
import getArtistAnswerTemplate from '../templates/artist-answer.js';
import initTimer from '../data/timer.js';
import {GameData} from '../data/game-data.js';
import {checkAnswer} from '../data/game-service.js';

export default (levelArtistData) => {
  const headerData = {
    timer: initTimer(GameData.allTime),
    mistakes: GameData.mistakes
  };

  const levelContent = `<section class="main main--level main--level-artist">
    ${getHeaderTemplate(headerData)}
    <div class="main-wrap">
      <h2 class="title main-title">${levelArtistData.title}</h2>
      ${getPlayerTemplate(levelArtistData.audio)}
      <form class="main-list">
      ${levelArtistData.answers.map((item, index) =>
        getArtistAnswerTemplate(item, index + 1)).join(``)}
      </form>
    </div>
  </section>`;

  const screenLevelArtist = getElement(levelContent);
  const answerBtns = screenLevelArtist.querySelectorAll(`.main-answer-r`);

  answerBtns.forEach((btn) => {
    btn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const userAnswer = +btn.value.trim();
      checkAnswer({answered: levelArtistData.right === userAnswer, time: 30});
    });
  });

  return screenLevelArtist;
};
