const execa = require('execa');
const updatePackageVersion = require('./update-package-version');

module.exports = async (version, logger) => {
  await updatePackageVersion(version, logger);

  logger.log('Publishing version %s to apm registry', version);
  const shell = await execa.shell('apm publish');
  process.stdout.write(shell.stdout);
};
