const verifyApm = require('./lib/verify');
const publishApm = require('./lib/publish');
const getPkg = require('./lib/get-pkg');
const getLastReleaseApm = require('./lib/get-last-release');

let verified;

async function verifyConditions(pluginConfig, {logger}) {
  const pkg = await getPkg();
  await verifyApm(pkg, logger);
  verified = true;
}

async function getLastRelease(pluginConfig, {logger}) {
  const pkg = await getPkg();
  if (!verified) {
    await verifyApm(pkg, logger);
    verified = true;
  }
  return getLastReleaseApm(pkg, logger);
}

async function publish(pluginConfig, {pkg, nextRelease, logger}) {
  if (!verified) {
    await verifyApm(pkg, logger);
    verified = true;
  }
  await publishApm(nextRelease, logger);
}

module.exports = {
  verifyConditions: verifyConditions,
  getLastRelease: getLastRelease,
  publish: publish,
};
