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
		// Directory doesn't exist or something.
	}
	if (stats && stats.isDirectory()) {
		exec(
			`rm -rf ${projectPath}`,
			CONFIG.onCallback
		);
	}
});
