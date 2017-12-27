const HelloWorld = artifacts.require('./helloworld');

contract('helloworld', () => {
  it('should return "Hello, World!"', () => {
    return HelloWorld.deployed().then(instance => {
      return instance.sayHello.call();
    }).then(response => {
      assert.equal(response, 'Hello, World!');
    });
  })
});