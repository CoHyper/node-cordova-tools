#!/usr/bin/env node

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @param {string} projectPath
 */
let projectPath = CONFIG.getKey('projectPath');

fs.stat(projectPath, function (err, stats) {
	if (err) {
		return console.warn(err);
	}

	if (stats && stats.isDirectory()) {
		exec(
			[
				`cd ${projectPath}`,
				'cordova clean'
			].join(' && '),
			CONFIG.onCallback
		);
	} else {
		console.warn(`The projectPath (${projectPath}) not exists.`);
	}
});
