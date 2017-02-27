#!/usr/bin/env node

/**
 * Add cordova platforms.
 *
 * @author Sven Hedström-Lang
 * @copyright 2017-02-05
 * todo check if build/www exists - need it to add new plugins
 * todo check json exists
 *
 * todo - first: before install remove all installed platforms
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

const projectJSON = CONFIG.getProjectConfigJson();
const cordovaPlatforms = projectJSON.platforms || [];

exec(
	[
		'cd ./build',
		`./../node_modules/.bin/cordova platform add ${cordovaPlatforms.join(' ')} --save`
	].join(' && '),
	CONFIG.onCallback
);
