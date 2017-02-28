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
 * @param {string} textEditor - Path to a text editor (IDE).
 * @param {string} title
 */
let projectPath = CONFIG.getKey('projectPath');
let textEditor = CONFIG.getKey('textEditor');
let title = CONFIG.getKey('title');

fs.stat(projectPath, function (err, stats) {
	if (err) {
		return console.warn(err);
	}

	// todo move to config
	// bugfix: spaces in title
	title = title.replace(/ /g, '\\ ');

	exec(
		`${textEditor} ${projectPath}/platforms/ios/${title}/${title}-Info.plist`,
		CONFIG.onCallback
	);

});
