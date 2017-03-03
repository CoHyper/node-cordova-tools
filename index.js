#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

if (process.argv) {

	const exec = require('child_process').exec;
	const TASKS = {
		'1': 'css-sass-development',
		'200': 'js-eslint',
		'400': 'copy'
		// todo solution for deprecated
	};

	const TASKS2 = [];
	TASKS[100] = 'css-sass-development';


	process.argv.forEach(function (id, index) {
		if (index >= 2) {
			let item = TASKS[id];
			if (item) {

				console.log(`${index}: ${id}`); // todo

				exec(
					`node node-cordova-tools/src/${item}.js`,
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
