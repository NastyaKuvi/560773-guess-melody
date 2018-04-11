import {assert} from 'chai';
import {getPlayerScore, displayPlayerScore} from './game-result.js';
import {
  NotAllAnsweredByAttempts,
  NormalAllAnswered,
  RandomAllAnswered,
  GamesResult
} from './test-data.js';

describe(`check calculating of user score`, () => {
  it(`should return correct user score`, () => {
    assert.equal(getPlayerScore([], 0), -1);

    let {answers, lifes} = NotAllAnsweredByAttempts;
    assert.equal(getPlayerScore(answers, lifes), -1);

    ({answers, lifes} = NormalAllAnswered);
    assert.equal(getPlayerScore(answers, lifes), 10);

    ({answers, lifes} = RandomAllAnswered);
    assert.equal(getPlayerScore(answers, lifes), 12);
  });

  it(`should not allow use wrong values to lifes`, () => {
    assert.throws(() => getPlayerScore([], -1),
        /Remaining lifes should be a value from 0 to 3/);
    assert.throws(() => getPlayerScore([], 5),
        /Remaining lifes should be a value from 0 to 3/);
  });

  it(`should not allow use wrong types of input fields`, () => {
    assert.throws(() => getPlayerScore({}, 3),
        /Answers should be of type array/);
    assert.throws(() => getPlayerScore([], `ddes`),
        /Remaining lifes should be of type number/);
  });
});

describe(`check diplaying of scores between players`, () => {
  it(`should return correct mesage when user lose the game(time ended)`, () => {
    const {statistic, playerResult, message} = GamesResult[0];
    assert.equal(displayPlayerScore(statistic, playerResult), message);
  });

  it(`should return correct mesage when user lose the game(lifes ended)`, () => {
    const {statistic, playerResult, message} = GamesResult[1];
    assert.equal(displayPlayerScore(statistic, playerResult), message);
  });

  it(`should return correct mesage when user win the game`, () => {

    let {statistic, playerResult, message} = GamesResult[2];
    assert.equal(displayPlayerScore(statistic, playerResult), message);

    ({statistic, playerResult, message} = GamesResult[3]);
    assert.equal(displayPlayerScore(statistic, playerResult), message);

    ({statistic, playerResult, message} = GamesResult[4]);
    assert.equal(displayPlayerScore(statistic, playerResult), message);

    ({statistic, playerResult, message} = GamesResult[5]);
    assert.equal(displayPlayerScore(statistic, playerResult), message);
  });


  it(`should not allow use wrong types of input fields`, () => {
    assert.throws(() => displayPlayerScore({}, 3),
        /scores should be of type array/);
    assert.throws(() => displayPlayerScore([], `ddes`),
        /player result should be of type object/);
  });
});
