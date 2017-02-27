'use strict';

/**
 * @author Sven Hedström-Lang
 */

const CONFIG = require('./../_config');
const exec = require('child_process').exec;

exec(
  'cd build && ./../node_modules/.bin/cordova clean && ./../node_modules/.bin/cordova build --release --buildConfig ./../app/store/build.json',
  CONFIG.onCallback
);
