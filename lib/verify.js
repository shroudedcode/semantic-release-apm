const verifyPkg = require('./verify-pkg');
const loginToApm = require('./login-to-apm');
const execa = require('execa');
const SemanticReleaseError = require('@semantic-release/error');

async function verifyApmCommand(logger) {
  try {
    await execa('apm');
  } catch (err) {
    throw new SemanticReleaseError(
      "The apm CLI is either not installed or doesn't work properly.",
      'EMISSINGAPMCOMMAND'
    );
  }
}

async function verifyLogin(logger) {
  await loginToApm(logger);
  try {
    await execa.shell('apm stars');
  } catch (err) {
    throw new SemanticReleaseError('Invalid apm token.', 'EINVALIDAPMTOKEN');
  }
}

module.exports = async (pkg, logger) => {
  verifyPkg(pkg);
  await verifyApmCommand(logger);
  verifyLogin(logger);
};
