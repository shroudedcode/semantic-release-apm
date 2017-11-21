const request = require('request-promise-native');

module.exports = async name =>
  request({
    uri: `https://atom.io/api/packages/${name}`,
    json: true,
  });
