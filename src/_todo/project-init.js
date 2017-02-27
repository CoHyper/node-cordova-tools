'use strict';

/**
 * @author Sven Hedström-Lang
 * @copyright 2016-10-01
 */

const CONFIG = require('./../_config');
const exec = require('child_process').exec;

/**
 * 1. Delete folder.
 * 2. Create folder.
 * 3. Copy all files and folder.
 */

exec([
  `rm -rf ${CONFIG.DIR_APP}`, // todo need ?
  `cp -rv ${CONFIG.DIR_NEW_PROJECT_APP}/* .`,
  `cp -v ${CONFIG.DIR_NEW_PROJECT}/.gitignore .`
  ].join(' && '),
  CONFIG.onCallback
);
