
const DeclensionType = {
  ZERO: 0,
  ONE: 1,
  FEW_MIN: 2,
  FEW_MAX: 4,
  MANY_MIN: 5,
  MANY_MAX: 9
};

const DeclensionWords = {
  MINUTES: `MINUTES`,
  SECONDS: `SECONDS`,
  SCORE: `SCORE`,
  MISTAKE: `MISTAKE`,
  COUNT: `COUNT`
};

const DeclensionDictionary = {
  MINUTES: {one: `минуту`, few: `минуты`, many: `минут`, default: `минута`},
  SECONDS: {one: `секунду`, few: `секунды`, many: `секунд`, default: `секунда`},
  SCORE: {one: `балл`, few: `балла`, many: `баллов`, default: `балл`},
  MISTAKE: {one: `ошибку`, few: `ошибки`, many: `ошибок`, default: `ошибка`},
  COUNT: {one: `раз`, few: `раза`, many: `раз`, default: `раз`}
};

const isMany = (number) => {
  return number >= DeclensionType.MANY_MIN && number <= DeclensionType.MANY_MAX ||
    number === DeclensionType.ZERO;
};

const isFew = (number) => {
  return number >= DeclensionType.FEW_MIN && number <= DeclensionType.FEW_MAX;
};

const isOnce = (number) => {
  return number === DeclensionType.ONE;
};

const getCorrectNounForm = (noun, number) => {
  const residue = number % 10;
  if (isMany(residue)) {
    return `${number} ${DeclensionDictionary[noun].many}`;
  }

  if (isFew(residue)) {
    return `${number}  ${DeclensionDictionary[noun].few}`;
  }

  if (isOnce(residue)) {
    return `${number}  ${DeclensionDictionary[noun].one}`;
  }

  return `${number}  ${DeclensionDictionary[noun].default}`;
};

export {
  DeclensionWords,
  getCorrectNounForm
};
