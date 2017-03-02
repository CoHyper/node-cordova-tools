#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

const PLATFORM = 'android';

/**
 * cordova clean <PLATFORM>
 * cordova build <PLATFORM>
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = `cordova-build-${PLATFORM}-release`;

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'buildConfig'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const buildConfig = CONFIG.getKey('buildConfig');

	fs.stat(projectPath, function (err, stats) {
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
					`cordova clean ${PLATFORM}`,
					`cordova build ${PLATFORM} --release --buildConfig ${buildConfig}`
				].join(' && '),
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
							message: `The ${PLATFORM} application build.`
						});
					}
				}
			);
		}

	});

}
