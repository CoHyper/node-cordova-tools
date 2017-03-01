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
let projectPath = CONFIG.getKey('projectPath');
let platforms = CONFIG.getKey('platforms');
let platform = 'browser';

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
