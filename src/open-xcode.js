#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Open the application in xCode.
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'open-xcode';

if (CONFIG.isArgs(['projectPath', 'title'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const title = CONFIG.replaceEmptyString(CONFIG.getKey('title'));
	const iosFolder = `${projectPath}/platforms/ios`;

	fs.stat(iosFolder, function (err, stats) {
		if (err) {
			CONFIG.nctReport({
				type: 'ERROR',
				namespace: NAMESPACE,
				message: err
			});

			return;
		}

		exec(
			`open ${iosFolder}/${title}.xcodeproj`,
			function (error, stdout, stderr) {
				if (error) {
					console.warn(stdout);
					console.warn(stderr);
					console.warn(error);
				} else {
					CONFIG.nctReport({
						type: 'INFO',
						namespace: NAMESPACE,
						message: stdout
					});
				}
			}
		);

	});

}
