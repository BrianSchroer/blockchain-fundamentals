module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    production: {
      host: 'rlcgj3xdz2l7.centralus.cloudapp.azure.com',
      port: 8545,
      network_id: '*',
      gas: 500000
    }
  }
};
