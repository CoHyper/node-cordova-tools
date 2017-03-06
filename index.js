#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

// https://nodejs.org/api/process.html#process_process_argv
if (process.argv) {

	const exec = require('child_process').exec;

	const TASKS = {
		// 100 - css
		'_101': 'css-sass-development',
		// 200 - html
		// 300 - img
		// 400 - js
		'_401': 'copy',
		'_402': 'js-eslint'
		// 500 cordova

		// todo cordova run PLATFORM
		// todo - id = namespace
		// todo solution for deprecated
		// todo check exists file
		// todo sort/search in readme.md
		// todo move to config
	};

	process.argv.forEach(function (id, index) {
		if (index >= 2) {
			let item = TASKS[`_${id}`];
			if (item) {

				console.log(`${index}: ${id}`); // todo

				exec(
					`ID=${id} node node-cordova-tools/src/${item}.js`,
					function (error, stdout, stderr) {
						if (error) {
							console.warn(stdout);
							console.warn(stderr);
							console.warn(error);

							return;
						}

						console.log(stdout);
					}
				);
			} else {
				console.warn(`task id ${id} not exists.`); // todo
			}
		}
	});

}
