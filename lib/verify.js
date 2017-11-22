const verifyPkg = require('./verify-pkg');
const loginToApm = require('./login-to-apm');
const execa = require('execa');
const SemanticReleaseError = require('@semantic-release/error');

module.exports = async (pkg, logger) => {
  verifyPkg(pkg);
  await loginToApm(logger);
  try {
    await execa.shell('apm stars');
  } catch (err) {
    throw new SemanticReleaseError('Invalid apm token.', 'EINVALIDAPMTOKEN');
  }
};
