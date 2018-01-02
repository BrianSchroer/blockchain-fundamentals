var MyGame = artifacts.require('./MyGame.sol');

module.exports = function (deployer) {
  deployer.deploy(MyGame);
};
