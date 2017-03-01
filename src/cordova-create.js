#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * cordova create <projectPath> <bundleId> <title>
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'cordova-create';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'bundleId', 'title'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const bundleId = CONFIG.getKey('bundleId');
	const title = CONFIG.getKey('title');

	fs.stat(projectPath, function (err, stats) {
		if (err) {

			// bugfix: if folder not exists, create empty one
			let appPath = projectPath.replace(/\/$/, '').split('/');
			for (let i = 1; i <= appPath.length; i++) {
				let segment = appPath.slice(0, i).join('/');
				!fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
			}

		}

		exec(
			`cordova create ${projectPath} ${bundleId} '${title}'`,
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

	});

}
