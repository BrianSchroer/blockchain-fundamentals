pragma solidity ^0.4.17;

contract ScoreStore {
  mapping(string => int) personScores;

  function addPersonScore(string name, int startingScore) public {
    require(personScores[name] == 0);
    personScores[name] = startingScore;
  }

  function getScore(string name) public view returns (int) {
    return personScores[name];
  }
}
