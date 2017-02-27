#!/usr/bin/env node

/**
 * Copy index.html. If file exists override.
 *
 * @author Sven Hedström-Lang
 * @copyright 2016-02-05
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

exec(
	'cp -r ./www/index.html ./build/www',
	CONFIG.onCallback
);
