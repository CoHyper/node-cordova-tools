#!/usr/bin/env node

/**
 * Copy. If file exists override.
 *
 * @author Sven Hedström-Lang
 * @copyright 2016-02-05
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

exec(
	'cp -r ./www/js/Project/app/www/config.json ./build/www',
	CONFIG.onCallback
);
