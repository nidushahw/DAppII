const HealthCoin = artifacts.require("HealthCoin");

module.exports = function(deployer) {
  deployer.deploy(HealthCoin, "0xf1b80a92f18cc18fbb5ce829d44b1519ccb1b617d35936f587526dc565070120", "Health Coin", "HC", 10000, 50);
}