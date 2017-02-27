#!/usr/bin/env node

/**
 * @author Sven Hedström-Lang
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

let file = 'www/js/Project/app/www/css/_index.scss:build/www/css/index.css';

exec(
  `sass ${file} --style compressed --sourcemap=none --no-cache`,
  CONFIG.onCallback
);
