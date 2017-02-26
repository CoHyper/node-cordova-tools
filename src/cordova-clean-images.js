#!/usr/bin/env node

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * Delete files not folder.
 *
 * @author Sven Hedström-Lang
 *
 * @param {string} projectPath
 * @param {array} platforms
 * @param {string} title
 */
let projectPath = CONFIG.getKey('projectPath');
let projectPathplatforms = CONFIG.getKey('platforms');
let title = CONFIG.getKey('title');

// bugfix: spaces in title
title = title.replace(/ /g, '\\ ');

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

