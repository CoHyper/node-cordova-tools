#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

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

if (CONFIG.isObject(copy)) {

	for (let key in copy) {
		if (copy.hasOwnProperty(key)) {
			fs.stat(key, function (err, stats) {
				if (err) {
					return console.warn(err);
				}

				if (stats && (stats.isDirectory() || stats.isFile())) {
					command.push(`cp -r ${key} ${projectPath}/${copy[key]}`);
					console.log(`copy ${key} to ${projectPath}/${copy[key]}`)
				} else {
					console.warn(`(${key}) is no file or folder.`);
				}
			});

		}
	}

	fs.stat(projectPath, function (err, stats) {
		if (err) {
			return console.warn(err);
		}

		if (stats && stats.isDirectory()) {
			exec(
				command.join(' && '),
				CONFIG.onCallback
			);
		}
	});

}
