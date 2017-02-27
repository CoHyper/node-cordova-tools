#!/usr/bin/env node

let cordova = require('cordova');
let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires npm install -g cordova
 *
 * @param {string} projectPath
 * @param {string} bundleId
 * @param {string} title
 */
let projectPath = CONFIG.getKey('projectPath');
let bundleId = CONFIG.getKey('bundleId');
let title = CONFIG.getKey('title');

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
		CONFIG.onCallback
	);

});
