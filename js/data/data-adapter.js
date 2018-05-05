import {LevelType} from "./game-data";

const adaptServerData = (data) => {
  let result = [];
  for (const level of data) {
    result.push({type: level.type, info: prepareInfo(level)});
  }

  const mapres = (res) => {
    if (typeof res.info.right !== `undefined`) {
      return res.info.right;
    }

    return res.info.answers.map((ans) => ans.right);
  };
  console.log(result.map((res) => mapres(res)));
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
    audio: `<audio src="${level.src}" autoplay></audio>`,
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
      audio: `<audio src="${answer.src}"></audio>`,
      right: answer.genre === genre
    });
  }
  return result;
};

export default adaptServerData;
