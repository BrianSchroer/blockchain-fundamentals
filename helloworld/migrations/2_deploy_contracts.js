var HelloWorld = artifacts.require('./helloworld.sol');

module.exports = function (deployer) {
  deployer.deploy(HelloWorld);
};
