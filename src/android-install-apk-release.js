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
