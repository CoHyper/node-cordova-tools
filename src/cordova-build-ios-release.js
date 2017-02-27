#!/usr/bin/env node

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
let platform = 'ios';

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
