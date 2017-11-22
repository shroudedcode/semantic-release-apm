import test from 'ava';
import nock from 'nock';
import {stub} from 'sinon';
import tempy from 'tempy';
import getLastRelease from '../lib/get-last-release';
import {unavailable, available, unpublished} from './helpers/mock-api';

let processStdout;
let processStderr;

test.before(() => {
  // Disable npm logger during tests
  processStdout = stub(process.stdout, 'write');
  processStderr = stub(process.stderr, 'write');
});

test.beforeEach(t => {
  // Save the current process.env
  t.context.env = Object.assign({}, process.env);
  process.env.APM_TOKEN = 'npm_token';
  // Save the current working diretory
  t.context.cwd = process.cwd();
  // Change current working directory to a temp directory
  process.chdir(tempy.directory());
  // Stub the logger
  t.context.log = stub();
  t.context.logger = {log: t.context.log};
});

test.afterEach.always(t => {
  // Restore process.env
  process.env = Object.assign({}, t.context.env);
  // Clear nock
  nock.cleanAll();
  // Restore the current working directory
  process.chdir(t.context.cwd);
});

test.after.always(() => {
  // Restore stdout and stderr
  processStdout.restore();
  processStderr.restore();
});

test.serial('Get release from package name', async t => {
  const mock = available();
  const release = await getLastRelease({name: 'package'}, t.context.logger);
  t.is(release.version, '1.2.3');
  t.true(mock.isDone());
});

test.serial('Get nothing from completely unpublished package name', async t => {
  const mock = unpublished();
  const release = await getLastRelease({name: 'package'}, t.context.logger);
  t.is(release.version, undefined);
  t.true(mock.isDone());
});

test.serial('Get nothing from not yet published package name (unavailable)', async t => {
  const mock = unavailable();
  const release = await getLastRelease({name: 'package'}, t.context.logger);
  t.is(release.version, undefined);
  t.true(mock.isDone());
});
