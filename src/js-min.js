#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 *
 * @test works with uglify-js
 */

const fs = require('fs');
const compressor = require('node-minify');
const CONFIG = require('./../lib/config');



let projectPath = CONFIG.getKey('projectPath');
let jsMinifyOptions = CONFIG.getKey('jsMinifyOptions');

if (CONFIG.isObject(jsMinifyOptions)) {
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
