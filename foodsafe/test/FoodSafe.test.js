const FoodSafe = artifacts.require('./FoodSafe');

contract('FoodSafe', () => {

  it('.getTrailCount() should return zero before trails are added', () => {
    return FoodSafe.deployed().then(instance => {
      return instance.getTrailCount.call();
    }).then(response => {
      assert.equal(response, 0);
    });
  });

  it('.addNewLocation() should increment trail count', () => {
    return FoodSafe.deployed().then(instance => {
      instance.addNewLocation(1, 'Location1', 'Secret1');
      instance.addNewLocation(2, 'Location2', 'Secret2');
      return instance.getTrailCount.call();
    }).then(response => {
      assert.equal(response.toNumber(), 2);
    });
  });

  it('.getLocation() should return values added via addLocation()', () => {
    return FoodSafe.deployed().then(instance => {
      instance.addNewLocation(3, 'Location3', 'Secret3');
      return instance.getLocation.call(2);
    }).then(response => {
      assert.equal(response[0], 'Location3');
      assert.equal(response[1].toNumber(), 3);
      assert.equal(response[2].toNumber(), 2);
      assert.isTrue(response[3].toNumber() > 0);
      assert.equal(response[4], 'Secret3');
    });
  });

  it('.addLocation() should set previousLocationId and timestamp', () => {
    return FoodSafe.deployed().then(instance => {
      instance.addNewLocation(4, 'Location4', 'Secret4');
      instance.addNewLocation(5, 'Location5', 'Secret5');
      return instance.getLocation.call(4);
    }).then(response => {
      assert.equal(response[2].toNumber(), 4);
      assert.isTrue(response[3].toNumber() > 0);
    });
  });

});
