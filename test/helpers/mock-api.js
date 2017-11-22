import nock from 'nock';

const API_URL = 'https://atom.io/api/packages/';
const availablePackage = {
  name: 'package',
  releases: {
    latest: '1.2.3',
  },
};
const unpublishedPackage = {
  name: 'package',
  releases: {},
};

export function mock(packageName) {
  return nock(API_URL).get('/package');
}

export function unavailable() {
  return mock().reply(404, {});
}

export function available() {
  return mock().reply(200, availablePackage);
}

export function unpublished() {
  return mock().reply(200, unpublishedPackage);
}
