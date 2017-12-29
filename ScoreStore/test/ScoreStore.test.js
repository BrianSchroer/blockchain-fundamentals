const ScoreStore = artifacts.require('./ScoreStore');

contract('ScoreStore', () => {

  it('.addPersonScore() should not throw error if called once for person()', () => {
    return ScoreStore.deployed().then(instance => {
      instance.addPersonScore('Test Person', 1);
    });
  });

  // it('.addPersonScore() should throw error if called twice for same person()', () => {
  //   return ScoreStore.deployed().then(instance => {
  //     instance.addPersonScore('Test Person 2', 2);
  //     try {
  //       instance.addPersonScore('Test Person 2', 2);
  //     } catch (err) {
  //       //console.log(err);
  //     }
  //   });
  // });

  it('.getScore() should return value set by .addPersonScore()', () => {
    let inst;
    return ScoreStore.deployed().then(instance => {
      instance.addPersonScore('Test Person 3', 3);
      return instance.getScore.call('Test Person 3');
    }).then(response => {
      assert.equal(response, 3);
    });
  });

  it('.getScore() should return zero for unadded person', () => {
    return ScoreStore.deployed().then(instance => {
      return instance.getScore.call('Unadded person');
    }).then(response => {
      assert.equal(response, 0);
    });
  });

});
