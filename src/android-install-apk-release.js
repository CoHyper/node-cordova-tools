#!/usr/bin/env node

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires "Android Device to USB"
 *
 * @param {string} projectPath
 * @param {string} androidAdb
 */
let projectPath = CONFIG.getKey('projectPath');
let androidAdb = CONFIG.getKey('androidAdb');

let releasePath = `${projectPath}/platforms/android/build/outputs/apk`;

// check releasePath
fs.stat(releasePath, function (err, stats) {
	if (err) {
		return console.warn(err);
	}

	exec(
		`${androidAdb} install ${releasePath}/android-release.apk`,
		CONFIG.onCallback
	);

});
