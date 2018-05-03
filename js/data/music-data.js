import {shuffleArray, getRandomItem} from "../utils";

// Music from https://www.youtube.com/audiolibrary/music?feature=blog
const MUSIC = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

const getLevelArtist = () => {
  const shuffledArray = shuffleArray(MUSIC).slice(0, 3);
  const itemToAnswer = getRandomItem(shuffledArray);
  return {
    title: `Кто исполняет эту песню?`,
    audio: `<audio src="${itemToAnswer.src}" autoplay>${itemToAnswer.artist} - ${itemToAnswer.name}</audio>`,
    right: /* shuffledArray.indexOf(itemToAnswer) +*/ 1,
    answers: shuffledArray
  };
};

const getLevelGenre = () => {
  const shuffledArray = shuffleArray(MUSIC).slice(0, 4);
  return {
    title: `Выберите инди-рок треки`,
    answers: [
      {
        audio: `<audio src="${shuffledArray[0].src}" autoplay>${shuffledArray[0].artist} - ${shuffledArray[0].name}</audio>`,
        answer: shuffledArray[0],
        right: true
      },
      {
        audio: `<audio src="${shuffledArray[1].src}">${shuffledArray[1].artist} - ${shuffledArray[1].name}</audio>`,
        answer: shuffledArray[1],
        right: false
      },
      {
        audio: `<audio src="${shuffledArray[2].src}">${shuffledArray[2].artist} - ${shuffledArray[2].name}</audio>`,
        answer: shuffledArray[2],
        right: true
      },
      {
        audio: `<audio src="${shuffledArray[3].src}">${shuffledArray[3].artist} - ${shuffledArray[3].name}</audio>`,
        answer: shuffledArray[3],
        right: false
      }
    ]
  };
};

export {
  getLevelArtist,
  getLevelGenre
};
