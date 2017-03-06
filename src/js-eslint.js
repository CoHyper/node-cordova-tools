#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'js-eslint';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'eslintrc', 'eslintFiles'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const eslintrc = CONFIG.getKey('eslintrc');
	const eslintFiles = CONFIG.getKey('eslintFiles');

	if (CONFIG.isArray(eslintFiles)) {
		exec(
			`node_modules/.bin/eslint --config ${eslintrc} ${eslintFiles.join(' ')}`,
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
						message: `Check JS Files.`
					});
				}
			}
		);
	}

}
