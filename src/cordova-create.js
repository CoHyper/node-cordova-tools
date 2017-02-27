#!/usr/bin/env node

let cordova = require('cordova');
let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires npm install -g cordova
 *
 * @param {string} projectPath
 * @param {string} bundleId
 * @param {string} title
 */
let projectPath = CONFIG.getKey('projectPath');
let bundleId = CONFIG.getKey('bundleId');
let title = CONFIG.getKey('title');

fs.stat(projectPath, function (err, stats) {
	if (err) {
		// Directory doesn't exist or something.
	}

	if (stats && stats.isDirectory()) {
		// exists
		console.warn(`Cant create new project in projectPath (${projectPath}).`);
	} else {
		exec(
			`cordova create ${projectPath} ${bundleId} '${title}'`,
			CONFIG.onCallback
		);
	}
});
