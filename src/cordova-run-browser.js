#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

const PLATFORM = 'browser';

/**
 * cordova run <PLATFORM>
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'cordova-run-browser';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'platforms'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const platforms = CONFIG.getKey('platforms');
	const platformPath = `${projectPath}/platforms/${PLATFORM}`;

	// check platformPath
	fs.stat(platformPath, function (err, stats) {
		if (err) {
			CONFIG.nctReport({
				type: 'ERROR',
				namespace: NAMESPACE,
				message: err
			});

			return;
		}

		if (stats && stats.isDirectory()) {
			exec(
				[
					`cd ${projectPath}`,
					//`cordova build ${PLATFORM}`
					 `cordova run ${PLATFORM}`
				].join(' && '),
				function (error, stdout, stderr) {
					if (error) {
						console.warn(stdout);
						console.warn(stderr);
						console.warn(error);
					} else {
						//console.log(stdout);
						CONFIG.nctReport({
							type: 'INFO',
							namespace: NAMESPACE,
							message: `Run ${PLATFORM}.`
						});
					}
				}
			);
		}
	});

}
