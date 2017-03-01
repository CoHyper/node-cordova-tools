#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * cordova platform rm <platform> --save
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'cordova-platform-remove';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'platforms'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const platforms = CONFIG.getKey('platforms');

	if (platforms.length) {

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
						`cordova platform rm ${platforms.join(' ')} --save`
					].join(' && '),
					function (error, stdout, stderr) {
						if (error) {
							console.warn(stdout);
							console.warn(stderr);
							console.warn(error);
						} else {
							CONFIG.nctReport({
								type: 'INFO',
								namespace: NAMESPACE,
								message: stdout
							});
						}
					}
				);
			}
		});

	}

}
