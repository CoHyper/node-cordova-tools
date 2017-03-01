#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Delete directory of "projectPath".
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'projectPath-delete';

if (CONFIG.isArgs(['projectPath'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');

	fs.stat(projectPath, function (err, stats) {
		if (err) {
			CONFIG.nctReport({
				type: 'INFO', // no ERROR
				namespace: NAMESPACE,
				message: `The directory (${projectPath}) not exists.`
			});
			// console.warn(err);
			return;
		}

		exec(
			`rm -rf ${projectPath}`,
			function (error, stdout, stderr) {
				if (error) {
					console.warn(stdout);
					console.warn(stderr);
					console.warn(error);
				} else {
					CONFIG.nctReport({
						type: 'INFO',
						namespace: NAMESPACE,
						message: `The directory (${projectPath}) delete.`
					});
					// console.log(stdout);
				}
			}
		);

	});

}
