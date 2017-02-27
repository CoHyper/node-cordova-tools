#!/usr/bin/env node

/**
 * Add cordova plugins.
 *
 * @author Sven Hedström-Lang
 * @copyright 2017-02-20
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

const projectJSON = CONFIG.getProjectConfigJson();
const cordovaPlugins = projectJSON.plugins || [];

exec(
	[
		'cd ./build',
		`./../node_modules/.bin/cordova plugin add ${cordovaPlugins.join(' ')} --save`
	].join(' && '),
	CONFIG.onCallback
);
