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
 * @author Sven Hedström-Lang
 *
 * @requires npm install -g cordova
 *
 * @param {string} projectPath
 * @param {array} plugins
 */
let projectPath = CONFIG.getKey('projectPath');
let plugins = CONFIG.getKey('plugins');

if (CONFIG.utility.isArray(plugins) && plugins.length) {
	fs.stat(projectPath, function (err, stats) {
		if (err) {
			return console.warn(err);
		}

		if (stats && stats.isDirectory()) {
			exec(
				[
					`cd ${projectPath}`,
					`cordova plugin add ${plugins.join(' ')} --save`
				].join(' && '),
				CONFIG.onCallback
			);
		} else {
			console.warn(`The projectPath (${projectPath}) not exists.`);
		}
	});
} else {
	console.warn('No plugins found.');
}
