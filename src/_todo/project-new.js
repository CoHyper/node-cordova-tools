#!/usr/bin/env node

/**
 *
 * @author Sven Hedström-Lang
 * @copyright 2016-02-20
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

const projectJSON = CONFIG.getProjectConfigJson();

exec(
	[
		`./node_modules/.bin/cordova create build ${projectJSON.bundleId} '${projectJSON.title}'`
	].join(' && '),
	CONFIG.onCallback
);
