import {LevelType} from "./game-data";

const adaptServerData = (data) => {
  const result = [];
  for (const level of data) {
    result.push({type: level.type, info: prepareInfo(level)});
  }

  return result;
};

const prepareInfo = (level) => {
  if (level.type === LevelType.ARTIST) {
    return prepareArtistInfo(level);
  }
  return prepareGenreInfo(level);
};

const prepareArtistInfo = (level) => {
  return {
    title: level.question,
    audio: level.src,
    right: level.answers.findIndex((answer) => answer.isCorrect),
    answers: level.answers,
  };
};

const prepareGenreInfo = (level) => {
  return {
    title: level.question,
    answers: prepareGenreAnswers(level.answers, level.genre),
  };
};

const prepareGenreAnswers = (answers, genre) => {
  const result = [];
  for (const answer of answers) {
    result.push({
      audio: answer.src,
      right: answer.genre === genre
    });
  }
  return result;
};

export default adaptServerData;
