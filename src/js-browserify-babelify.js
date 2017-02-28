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
 * Require 'projectPath/www/js' folder.
 *
 * @author Sven Hedström-Lang
 *
 * @requires npm install --save-dev babelify
 * @requires npm install --save-dev browserify
 *
 * @param {string} projectPath
 * @param {object} jsBrowserify
 * @param {string} jsBrowserify.input
 * @param {string} jsBrowserify.output
 * @param {string} jsBrowserify.options
 */
let projectPath = CONFIG.getKey('projectPath');
let jsBrowserify = CONFIG.getKey('jsBrowserify');
let input = jsBrowserify.input;
let output = `${projectPath}/${jsBrowserify.output}`;
let options = ` ${jsBrowserify.options} `; // require empty strings at first and end

fs.stat(projectPath, function (err, stats) {
	if (err) {
		return console.warn(err);
	}

	if (stats && stats.isDirectory()) {
		exec(
			`browserify ${input} -o ${output} -t [ babelify ${options} ]`,
			CONFIG.onCallback
		);
	} else {
		console.warn(`The projectPath (${projectPath}) not exists.`);
	}
});
