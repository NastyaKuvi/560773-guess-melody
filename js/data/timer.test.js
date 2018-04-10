import {assert} from 'chai';
import initTimer from './timer.js';

describe(`check work of timer`, () => {
  it(`should return message when time is over`, () => {
    const zeroTimer = initTimer(0);
    assert.equal(zeroTimer.tick(), `Время вышло`);

    const timer = initTimer(30);
    assert.equal(timer.tick(), 29);
  });

  it(`should not allow use negative values to timer`, () => {
    assert.throws(() => initTimer(-1),
        /time should be a positive number/);
  });

  it(`should not allow use wrong types of input field`, () => {
    assert.throws(() => initTimer({}),
        /time should be type of number/);
    assert.throws(() => initTimer(`sf`),
        /time should be type of number/);
  });
});
