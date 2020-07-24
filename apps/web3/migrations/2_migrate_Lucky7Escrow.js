const Lucky7Escrow = artifacts.require('Lucky7Escrow');

module.exports = function (deployer) {
  deployer.deploy(Lucky7Escrow);
};
