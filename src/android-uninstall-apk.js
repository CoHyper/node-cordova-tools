#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Deinstall the Android apk.
 * Android Device to USB.
 *
 * @example
 * 		// The path to adb. Sometime is in $PATH.
 * 		"androidAdb": "~/Library/Android/sdk/platform-tools/adb"
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'android-uninstall-apk';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['androidAdb', 'bundleId'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const androidAdb = CONFIG.getKey('androidAdb');
	const bundleId = CONFIG.getKey('bundleId');

	exec(
		`${androidAdb} uninstall ${bundleId}`,
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
					message: `The Application uninstalled.`
				});
			}
		}
	);

}

