#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Delete files not folder.
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'cordova-clean-images';

if (CONFIG.isArgs(['projectPath', 'title'], NAMESPACE)) {


	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	let title = CONFIG.getKey('title');

	// bugfix: spaces in title
	title = title.replace(/ /g, '\\ ');

	let images = [
		`${projectPath}/platforms/android/res/**/screen.png`,
		`${projectPath}/platforms/android/res/**/icon.png`,
		`${projectPath}/platforms/browser/img/logo.png`,
		`${projectPath}/platforms/ios/${title}/Images.xcassets/AppIcon.appiconset/*.png`,
		`${projectPath}/platforms/ios/${title}/Images.xcassets/LaunchImage.launchimage/*.png`,
		`${projectPath}/www/img/logo.png`
	];

	CONFIG.nctReport({
		type: 'START',
		namespace: NAMESPACE
	});

	images.forEach(function (item) {
		exec(
			`rm -rf ${item}`,
			function (error, stdout, stderr) {
				if (error) {
					console.warn(stdout);
					console.warn(stderr);
					console.warn(error);
				} else {
					// console.log(stdout);
					// todo search icons and return only if found, return complet file name
					CONFIG.nctReport({
						type: 'INFO',
						namespace: NAMESPACE,
						message: `Delete ${item}.`
					});
				}
			}
		);
	});

	CONFIG.nctReport({
		type: 'END',
		namespace: NAMESPACE
	});

}
