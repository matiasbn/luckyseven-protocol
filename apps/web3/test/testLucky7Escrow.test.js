/* eslint-disable no-underscore-dangle */
const Lucky7Escrow = artifacts.require('Lucky7Escrow');
const {catchRevert} = require('./exceptionsHelpers.js');
const crypto = require('crypto');
const truffleAssert = require('truffle-assertions');

contract('Lucky7Escrow', (accounts) => {
  let targetContract;
  const owner = accounts[0];

  beforeEach(async () => {
    targetContract = await Lucky7Escrow.new();
  });

  it('should ask for a Lucky7Number properly', async () => {
    const numberCounterBefore = await targetContract.AddressToNumberCounter.call(
      owner
    );
    assert.equal(
      numberCounterBefore.toNumber(),
      0,
      'Initial numberCounter should be 0'
    );
    const hash = crypto.createHash('sha256');
    const digest = hash.update('5').digest('hex');
    const transaction = await targetContract.askForNumber(digest);
    truffleAssert.eventEmitted(transaction, 'AskForNumber1', (ev) => {
      return ev.owner === owner && ev.counter.toNumber() === 0;
    });
    truffleAssert.eventEmitted(transaction, 'AskForNumber2', (ev) => {
      return ev.owner === owner && ev.counter.toNumber() === 0;
    });
    const numberCounterAfter = await targetContract.AddressToNumberCounter.call(
      owner
    );
    assert.equal(
      numberCounterAfter.toNumber(),
      1,
      'Initial numberCounter should be 1'
    );
    const storedDigest = await targetContract.getLucky7Number.call(owner, 0);
    assert.equal(digest, storedDigest.wrappedNumberEnvelope);
  });
});
