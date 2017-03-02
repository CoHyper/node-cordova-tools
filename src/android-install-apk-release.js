#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Install the apk to the Android device.
 * Android Device to USB.
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'android-install-apk-release';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'androidAdb'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const androidAdb = CONFIG.getKey('androidAdb');
	const releasePath = `${projectPath}/platforms/android/build/outputs/apk`;

	// check releasePath
	fs.stat(releasePath, function (err, stats) {
		if (err) {
			CONFIG.nctReport({
				type: 'ERROR',
				namespace: NAMESPACE,
				message: err
			});

			return;
		}

		exec(
			`${androidAdb} install ${releasePath}/android-release.apk`,
			function (error, stdout, stderr) {
				if (error) {
					console.warn(stdout);
					console.warn(stderr);
					console.warn(error);
				} else {
					// console.log(stdout);
					CONFIG.nctReport({
						type: 'INFO',
						namespace: NAMESPACE,
						message: `Install to device`
					});
				}
			}
		);

	});

}
