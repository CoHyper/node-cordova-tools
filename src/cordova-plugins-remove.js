#!/usr/bin/env node

let cordova = require('cordova');
let exec = require('child_process').exec;
let fs = require('fs');
let _ = require('lodash');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires npm install -g cordova
 *
 * @param {string} projectPath
 * @param {array} plugins
 */
let projectPath = CONFIG.getKey('projectPath');
let plugins = CONFIG.getKey('plugins');

if (_.isArray(plugins) && plugins.length) {
	fs.stat(projectPath, function (err, stats) {
		if (err) {
			// Directory doesn't exist or something.
		}
		if (stats && stats.isDirectory()) {
			exec(
				[
					`cd ${projectPath}`,
					`cordova plugin rm ${plugins.join(' ')} --save`
				].join(' && '),
				CONFIG.onCallback
			);
		}
	});
} else {
	console.warn('No plugins found.');
}
