#!/usr/bin/env node

let fs = require('fs');
let compressor = require('node-minify');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires npm install --save-dev node-minify
 * https://www.npmjs.com/package/node-minify
 *
 * @test works with uglify-js
 *
 * @param {string} projectPath
 * @param {object} jsMinifyOptions
 * @param {function} jsMinifyOptions.callback
 * @param {array} jsMinifyOptions.input
 * @param {string} jsMinifyOptions.output
 *
 * @example
 * 		jsMinifyOptions: {
 * 			compressor: 'uglifyjs',
 * 			input: [
 * 				'app/www/js/*.js'
 * 			],
 * 			output: 'www/js/index.js' // relativ to projectPath
 * 		}
 */
let projectPath = CONFIG.getKey('projectPath');
let jsMinifyOptions = CONFIG.getKey('jsMinifyOptions');

if (CONFIG.utility.isObject(jsMinifyOptions)) {
	jsMinifyOptions.callback = function (err, min) {
		if (err) {
			console.warn(err);
			console.warn(min);
		}
	};
	jsMinifyOptions.output = `${projectPath}/${jsMinifyOptions.output}`;

	// run node-minify
	compressor.minify(jsMinifyOptions);
} else {
	console.log('Invalid variable (jsMinifyOptions).');
}
