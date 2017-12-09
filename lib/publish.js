const execa = require('execa');
const updatePackageVersion = require('./update-package-version');

module.exports = async (nextRelease, logger) => {
  await updatePackageVersion(nextRelease.version, logger);

  logger.log('Publishing version %s to apm registry', nextRelease.version);
  const shell = await execa.shell(`apm publish --tag ${nextRelease.gitTag}`);
  process.stdout.write(shell.stdout);
};
