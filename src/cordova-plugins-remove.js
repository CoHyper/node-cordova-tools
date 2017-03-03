#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * cordova plugins rm <plugin> --save
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'cordova-plugins-remove';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'plugins'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const plugins = CONFIG.getKey('plugins');

	if (plugins.length) {
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
						`cordova plugin rm ${plugins.join(' ')} --save`
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
								message: 'All plugins removed.'
							});
						}
					}
				);
			}
		});
	}

}
