#!/usr/bin/env node

/**
 *
 * @copyright 2017-02-14
 * @author Sven Hedström-Lang
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

exec(
	[
		'cd ./build',
		'./../node_modules/.bin/cordova run browser'
	].join(' && '),
	CONFIG.onCallback
);
