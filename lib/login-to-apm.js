const execa = require('execa');
const SemanticReleaseError = require('@semantic-release/error');

module.exports = async logger => {
  if (process.env.APM_TOKEN) {
    logger.log('Logging in with atom.io API token');
    await execa.shell(`apm login --token ${process.env.APM_TOKEN}`);
  } else {
    throw new SemanticReleaseError('No apm token specified.', 'ENOAPMTOKEN');
  }
};
