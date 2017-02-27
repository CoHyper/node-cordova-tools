#!/usr/bin/env node

/**
 * @author Sven Hedström-Lang
 * todo need folder www/css
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;
// let folder = `${CONFIG.DIR_PROJECT}/www/css`;
// CONFIG.removeFolder(folder);

let file = 'www/js/Project/app/www/css/_index.scss:build/www/css/index.css';

exec(
  `sass ${file} --sourcemap=none --line-numbers --no-cache`,
  CONFIG.onCallback
);
