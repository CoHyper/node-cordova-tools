#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

let eslint = require('eslint');
let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires npm install --save-dev eslint
 * http://eslint.org/docs/user-guide/getting-started
 *
 * @param {string} projectPath
 * @param {string} eslintrc
 * @param {array} eslintFiles
 */
let projectPath = CONFIG.getKey('projectPath');
let eslintrc = CONFIG.getKey('eslintrc');
let eslintFiles = CONFIG.getKey('eslintFiles');

if (CONFIG.utility.isArray(eslintFiles)) {
	exec(
		`node_modules/.bin/eslint --config ${eslintrc} ${eslintFiles.join(' ')}`,
		CONFIG.onCallback
	);
}
