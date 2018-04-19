import playerTemplate from "./player-wrapper";

export default (answer, index) => {
  return `<div class="genre-answer">
            ${playerTemplate(answer.audio)}
            <input type="checkbox" name="answer" value="${index}" id="a-${index}">
            <label class="genre-answer-check" for="a-${index}"></label>
          </div>`;
};
