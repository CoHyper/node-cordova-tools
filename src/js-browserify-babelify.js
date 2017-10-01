#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');
const NAMESPACE = 'js-browserify-babelify';

/**
 * Require 'projectPath/www/js' folder.
 *
 * @author Sven Hedström-Lang
 *
 * @requires npm install --save-dev babelify
 * @requires npm install --save-dev browserify
 *
 * @param {string} projectPath
 * @param {object} jsBrowserify
 * @param {string} jsBrowserify.input
 * @param {string} jsBrowserify.output
 * @param {string} jsBrowserify.options
 * @param {string} nodeModulesDir
 */
if (CONFIG.isArgs(['projectPath', 'jsBrowserify', 'nodeModulesDir'], NAMESPACE)) {

	let projectPath = CONFIG.getKey('projectPath');
	let jsBrowserify = CONFIG.getKey('jsBrowserify');
	let nodeModulesDir = CONFIG.getKey('nodeModulesDir');
	let input = jsBrowserify.input;
	let output = `${projectPath}/${jsBrowserify.output}`;
	let options = ` ${jsBrowserify.options} `; // require empty strings at first and end

	fs.stat(projectPath, function (err, stats) {
		if (err) {
			return console.warn(`The projectPath (${projectPath}) not exists.`, err);
			// return console.warn(err);
		}

		// check browserify
		let node_browserify = `${nodeModulesDir}/browserify`;
		fs.stat(node_browserify, function (err, stats) {
			if (err) {
				return console.warn(`Missing ${node_browserify}`, err);
			}

			// check babelify
			let node_babelify = `${nodeModulesDir}/babelify`;
			fs.stat(node_babelify, function (err, stats) {
				if (err) {
					return console.warn(`Missing ${node_babelify}`, err);
				}

				// todo input , output, options

				exec(
					`browserify ${input} -o ${output} -t [ babelify ${options} ]`,
					function (error, stdout, stderr) {
						if (error) {
							console.warn(stdout);
							console.warn(stderr);
							return console.warn(error);
						} else {
							// console.log(stdout);
							CONFIG.nctReport({
								type: 'INFO',
								namespace: NAMESPACE,
								message: 'Build browserify and babelify. ' + stdout
							});
						}
					}
				);

			}); // END check babelify
		}); // END check browserify
	}); // END check projectPath

}
