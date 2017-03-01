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
 * Delete files not folder.
 *
 * @author Sven Hedström-Lang
 *
 * @param {string} projectPath
 * @param {string} title
 */
let projectPath = CONFIG.getKey('projectPath');
let title = CONFIG.getKey('title');
let images = [
	`${projectPath}/platforms/android/res/**/screen.png`,
	`${projectPath}/platforms/android/res/**/icon.png`,
	`${projectPath}/platforms/browser/img/logo.png`,
	`${projectPath}/platforms/ios/${title}/Images.xcassets/AppIcon.appiconset/*.png`,
	`${projectPath}/platforms/ios/${title}/Images.xcassets/LaunchImage.launchimage/*.png`,
	`${projectPath}/www/img/logo.png`
];

// bugfix: spaces in title
title = title.replace(/ /g, '\\ ');

console.log('# NCT: Start Delete the image:');

exec(
	[
		`rm -rf ${projectPath}/platforms/android/res/**/screen.png`,
		`rm -rf ${projectPath}/platforms/android/res/**/icon.png`,
		`rm -rf ${projectPath}/platforms/browser/img/logo.png`,
		`rm -rf ${projectPath}/platforms/ios/${title}/Images.xcassets/AppIcon.appiconset/*.png`,
		`rm -rf ${projectPath}/platforms/ios/${title}/Images.xcassets/LaunchImage.launchimage/*.png`,
		`rm -rf ${projectPath}/www/img/logo.png`
	].join(' && '),
	CONFIG.onCallback
);

images.forEach(function (item) {
	console.log(`# NCT: Delete the image ${projectPath}/${item}.`);
});

