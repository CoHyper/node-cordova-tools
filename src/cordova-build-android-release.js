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
 * @param {string} buildConfig
 * @param {string} platform
 */
let projectPath = CONFIG.getKey('projectPath');
let buildConfig = CONFIG.getKey('buildConfig');
let platform = 'android';

fs.stat(projectPath, function (err, stats) {
	if (err) {
		return console.warn(err);
	}

	if (stats && stats.isDirectory()) {
		exec(
			[
				`cd ${projectPath}`,
				`cordova clean ${platform}`,
				`cordova build ${platform} --release --buildConfig ${buildConfig}`
			].join(' && '),
			CONFIG.onCallback
		);
	}
});
