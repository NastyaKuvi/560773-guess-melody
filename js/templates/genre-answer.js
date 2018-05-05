export default (answer, index) => {
  return `<div class="genre-answer">
            <div class="player-wrapper-template"></div>
            <input type="checkbox" name="answer" value="${index}" id="a-${index}">
            <label class="genre-answer-check" for="a-${index}"></label>
          </div>`;
};
