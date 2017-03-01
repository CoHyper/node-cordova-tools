#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * cordova clean
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'cordova-clean';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');

	fs.stat(projectPath, function (err, stats) {
		if (err) {
			CONFIG.nctReport({
				type: 'ERROR',
				namespace: NAMESPACE,
				message: err
			});
		} else { // if (stats && stats.isDirectory()) {

			exec(
				[
					`cd ${projectPath}`,
					'cordova clean'
				].join(' && '),
				function (error, stdout, stderr) {
					if (error) {
						console.warn(stdout);
						console.warn(stderr);
						console.warn(error);
					} else {
						CONFIG.nctReport({
							type: 'ERROR',
							namespace: NAMESPACE,
							message: stdout
						});
					}
				}
			);
		}

	});

}
