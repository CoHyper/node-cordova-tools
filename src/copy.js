#!/usr/bin/env node

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * Copy files and folders.
 * If file exists override.
 * If folder exists sync.
 *
 * @author Sven Hedström-Lang
 *
 * @param {string} projectPath
 * @param {object} copy
 */
let projectPath = CONFIG.getKey('projectPath');
let copy = CONFIG.getKey('copy');
let command = [];

if (CONFIG.utility.isObject(copy)) {

	for (let key in copy) {
		if (copy.hasOwnProperty(key)) {
			fs.stat(key, function (err, stats) {
				if (err) {
					return console.warn(err);
				}

				if (stats && (stats.isDirectory() || stats.isFile())) {
					command.push(`cp -r ${key} ${projectPath}/${copy[key]}`);
				} else {
					console.warn(`(${key}) is no file or folder.`);
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

}
