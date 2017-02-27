#!/usr/bin/env node

/**
 * remove cordova platforms.
 *
 * @author Sven Hedström-Lang
 * @copyright 2017-02-20
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

const projectJSON = CONFIG.getProjectConfigJson();
const cordovaPlatforms = projectJSON.platforms || [];

exec(
	[
		'cd ./build',
		`./../node_modules/.bin/cordova platform remove ${cordovaPlatforms.join(' ')} --save`
	].join(' && '),
	CONFIG.onCallback
);
