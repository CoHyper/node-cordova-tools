#!/usr/bin/env node

/**
 * @copyright 2017-02-11
 * @author Sven Hedström-Lang
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

let jsFiles = CONFIG.FILES.js.join(' ');

exec(
	`./node_modules/.bin/eslint --config ./.eslintrc.js ${jsFiles} || true`,
	CONFIG.onCallback
);
