const HelloWorld = artifacts.require('./helloworld');

contract('helloworld', () => {
  it('.sayHello() should return "Hello, World!"', () => {
    return HelloWorld.deployed().then(instance => {
      return instance.sayHello.call();
    }).then(response => {
      assert.equal(response, 'Hello, World!');
    });
  })
});