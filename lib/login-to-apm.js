const execa = require('execa');

module.exports = async (token, logger) => {
  logger.log('Logging in with atom.io API token');
  await execa.shell(`apm login --token ${token}`);
};
