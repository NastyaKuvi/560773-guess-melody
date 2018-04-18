import playerTemplate from "./player-wrapper";

export default (answer) => {
  return `<div class="genre-answer">
            ${playerTemplate(answer.audio)}
            <input type="checkbox" name="answer" value="${answer.index}" id="a-${answer.index}">
            <label class="genre-answer-check" for="a-${answer.index}"></label>
          </div>`;
};
