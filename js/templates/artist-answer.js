export default (answer, index) => {
  return `<div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}"/>
            <label class="main-answer" for="answer-${index}">
              <img class="main-answer-preview" src=${answer.image.url}
                  alt=${answer.title} width="134" height="134">
              ${answer.title}
            </label>
          </div>`;
};
