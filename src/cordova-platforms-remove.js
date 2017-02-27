#!/usr/bin/env node

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * Add cordova platforms.
 *
 * @author Sven Hedström-Lang
 *
 * @requires npm install -g cordova
 *
 * @param {string} projectPath
 * @param {array} platforms
 */
let projectPath = CONFIG.getKey('projectPath');
let platforms = CONFIG.getKey('platforms');

if (CONFIG.utility.isArray(platforms) && platforms.length) {

	fs.stat(projectPath, function (err, stats) {
		if (err) {
			return console.warn(err);
		}

		if (stats && stats.isDirectory()) {
			exec(
				[
					`cd ${projectPath}`,
					`cordova platform rm ${platforms.join(' ')} --save`
				].join(' && '),
				CONFIG.onCallback
			);
		} else {
			console.warn(`The projectPath (${projectPath}) not exists.`);
		}
	});

} else {
	console.warn('No platform founds.');
}
