const {callbackify} = require('util');
const verifyApm = require('./lib/verify');
const publishApm = require('./lib/publish');
const getLastReleaseApm = require('./lib/get-last-release');

let verified;

async function verifyConditions(pluginConfig, {pkg, logger}) {
  await verifyApm(pkg, logger);
  verified = true;
}

async function getLastRelease(pluginConfig, {pkg, logger}) {
  if (!verified) {
    await verifyApm(pkg, logger);
    verified = true;
  }
  return getLastReleaseApm(pkg, logger);
}

async function publish(pluginConfig, {pkg, nextRelease: {version}, logger}) {
  if (!verified) {
    await verifyApm(pkg, logger);
    verified = true;
  }
  await publishApm(version, logger);
}

module.exports = {
  verifyConditions: callbackify(verifyConditions),
  getLastRelease: callbackify(getLastRelease),
  publish: callbackify(publish),
};
