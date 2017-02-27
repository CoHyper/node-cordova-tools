#!/usr/bin/env node

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * Copy files and folders - if exists override.
 *
 * @author Sven Hedström-Lang
 *
 * @param {string} projectPath
 * @param {object} copyFiles
 */
let projectPath = CONFIG.getKey('projectPath');
let copy = CONFIG.getKey('copy');
let command = [];

for (let key in copy) {
	if (copy.hasOwnProperty(key)) {
		fs.stat(key, function (err, stats) {
			if (err) {
				// Directory doesn't exist or something.
			}

			if (stats && (stats.isDirectory() || stats.isFile())) {
				command.push(`cp -r ${key} ${projectPath}/${copy[key]}`);
			} else {
				console.warn(`${key} not exists.`);
			}
		});

	}
}

fs.stat(projectPath, function (err, stats) {
	if (err) {
		// Directory doesn't exist or something.
	}

	if (stats && stats.isDirectory()) {
		exec(
			command.join(' && '),
			CONFIG.onCallback
		);
	}
});
