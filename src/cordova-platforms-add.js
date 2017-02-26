#!/usr/bin/env node

let cordova = require('cordova');
let exec = require('child_process').exec;
let fs = require('fs');
let _ = require('lodash');
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

if (_.isArray(platforms) && platforms.length) {
	fs.stat(projectPath, function (err, stats) {
		if (err) {
			// Directory doesn't exist or something.
		}
		if (stats && stats.isDirectory()) {
			exec(
				[
					`cd ${projectPath}`,
					`cordova platform add ${platforms.join(' ')} --save`
				].join(' && '),
				CONFIG.onCallback
			);
		}
	});
} else {
	console.warn('No platform found.');
}
