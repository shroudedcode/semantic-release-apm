const getPackage = require('./get-package');

module.exports = async ({name}, logger) => {
  try {
    const data = await getPackage(name);
    if (data && data.releases && data.releases.latest) {
      const version = data.releases.latest;
      return {version};
    }
    logger.log('No version of package %s found', name);
    return {};
  } catch (err) {
    if (err.statusCode === 404) {
      logger.log('Package %s not found', name);
      return {};
    }
    throw err;
  }
};
