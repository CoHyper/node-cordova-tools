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
 */
let projectPath = CONFIG.getKey('projectPath');
let jsMinifyOptions = CONFIG.getKey('jsMinifyOptions');

if (CONFIG.utility.isObject(jsMinifyOptions)) {
	jsMinifyOptions.callback = CONFIG.onCallbackEmpty;
	jsMinifyOptions.output = `${projectPath}/${jsMinifyOptions.output}`;

	// run node-minify
	compressor.minify(jsMinifyOptions);
}
