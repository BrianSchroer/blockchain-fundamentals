pragma solidity ^0.4.17;

contract IScoreStore {
  function getScore(string name) public view returns (int);
}

contract MyGame {
  function showScore(string name) public view returns (int) {
    IScoreStore scoreStore = IScoreStore(0xf46429fdd5d242ca8fd02ecb81e57719aac4cad6);
    return scoreStore.getScore(name);
  }
}
