#!/usr/bin/env node

let cordova = require('cordova');
let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires npm install -g cordova
 */

let projectPath = CONFIG.getKey('projectPath');
let platforms = CONFIG.getKey('platforms');
let platform = 'browser';

if (CONFIG.utility.isStringInArray(platform, platforms)) {

	fs.stat(`${projectPath}/platforms/${platform}`, function (err, stats) {
		if (err) {
			return console.warn(err);
		}

		if (stats && stats.isDirectory()) {
			exec(
				[
					`cd ${projectPath}`,
					`cordova run ${platform}`
				].join(' && '),
				CONFIG.onCallback
			);
		}
	});
}
