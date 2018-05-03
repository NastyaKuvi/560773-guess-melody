import {assert} from 'chai';
import Timer from './timer.js';

describe(`check work of timer`, () => {
  it(`should return message when time is over`, () => {
    const zeroTimer = new Timer(0);
    assert.equal(zeroTimer.tick(), false);

    const timer = new Timer(30);
    timer.start();
    assert.equal(timer.tick(), 29);
  });

  it(`should not allow use negative values to timer`, () => {
    assert.throws(() => new Timer(-1),
        /time should be a positive number/);
  });

  it(`should not allow use wrong types of input field`, () => {
    assert.throws(() => new Timer({}),
        /time should be type of number/);
    assert.throws(() => new Timer(`sf`),
        /time should be type of number/);
  });
});
