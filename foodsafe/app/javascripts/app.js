import '../stylesheets/app.css';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
var accounts;
var account;
var foodSafeAbi;
var foodSafeContract;
var foodSafeCode;

window.App = {
  start: function () {
    var self = this;
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = account;

      // FoodSafe.sol contents without line breaks:
      var foodSafeSource = "pragma solidity ^0.4.17; contract FoodSafe { struct Location { string name; uint locationId; uint previousLocationId; uint timestamp; string secret; } mapping(uint => Location) Trail; uint8 TrailCount = 0; function addNewLocation(uint locationId, string name, string secret) public { Location memory newLocation; newLocation.name = name; newLocation.locationId = locationId; newLocation.timestamp = now; newLocation.secret = secret; if (TrailCount > 0) { newLocation.previousLocationId = Trail[TrailCount - 1].locationId; } Trail[TrailCount] = newLocation; TrailCount++; } function getTrailCount() public view returns(uint8) { return TrailCount; } function getLocation(uint8 trailNumber) public view returns(string, uint, uint, uint, string) { return (Trail[trailNumber].name, Trail[trailNumber].locationId, Trail[trailNumber].previousLocationId, Trail[trailNumber].timestamp, Trail[trailNumber].secret); } } ";

      web3.eth.compile.solidity(foodSafeSource, function (error, foodSafeCompiled) {
        console.log(error);
        console.log(foodSafeCompiled);
        foodSafeAbi = foodSafeCompiled['<stdin>:FoodSafe'].info.abiDefinition; // ABI = application binary interface
        foodSafeContract = web.eth.contract(foodSafeAbi);
        foodSafeCode = foodSafeCompiled['<stdin>:FoodSafe'].code;
      });
    });
  },

  createContract: function () {
    foodSafeContract.new(
      '',
      {
        from: account,
        data: foodSafeCode,
        gas: 3000000
      },
      function (error, deployedContract) {
        if (deployedContract.address) {
          document.getElementById('contractAddress').value = deployedContract.address;
        }
      }
    );
  }
};

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
