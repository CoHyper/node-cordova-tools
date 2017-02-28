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
 * @param {string} projectPath
 * @param {string} title
 */
let projectPath = CONFIG.getKey('projectPath');
let title = CONFIG.getKey('title');

fs.stat(projectPath, function (err, stats) {
	if (err) {
		return console.warn(err);
	}

	// todo move to config
	// bugfix: spaces in title
	title = title.replace(/ /g, '\\ ');

	exec(
		`open ${projectPath}/platforms/ios/${title}.xcodeproj`,
		CONFIG.onCallback
	);

});
