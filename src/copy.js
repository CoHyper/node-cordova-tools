#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Copy files and folders.
 * If file or folder exists override.
 * todo - if exists override variables?
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'copy';

CONFIG.nctReport({
	type: 'END',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'copy'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const copy = CONFIG.getKey('copy');

	for (let key in copy) {

		if (copy.hasOwnProperty(key)) {
			fs.stat(key, function (err, stats) {
				if (err) {
					CONFIG.nctReport({
						id: 1,
						type: 'ERROR',
						namespace: NAMESPACE,
						message: err
					});
					return;
				}

				if (stats && (stats.isDirectory() || stats.isFile())) {

					fs.stat(projectPath, function (err, stats) {
						if (err) {
							CONFIG.nctReport({
								id: 2,
								type: 'ERROR',
								namespace: NAMESPACE,
								message: err
							});
							return;
						}

						if (stats && stats.isDirectory()) {

							exec(
								`cp -r ${key} ${projectPath}/${copy[key]}`,
								function (error, stdout, stderr) {
									if (error) {
										console.warn(stdout);
										console.warn(stderr);
										console.warn(error);
									} else {
										// console.log(stdout);
										CONFIG.nctReport({
											id: 3,
											type: 'INFO',
											namespace: NAMESPACE,
											message: `Copy ${key} to ${projectPath}/${copy[key]}`
										});
									}
								}
							);
						}
					});

				} else {
					CONFIG.nctReport({
						id: 4,
						type: 'ERROR',
						namespace: NAMESPACE,
						message: `(${key}) is no file or folder.`
					});
				}
			});

		}
	}

}

CONFIG.nctReport({
	type: 'END',
	namespace: NAMESPACE
});
