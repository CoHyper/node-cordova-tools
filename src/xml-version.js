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

/**
 * @author Sven Hedström-Lang
 *
 * @param {string} projectPath
 * @param {string} configXmlFile
 * @param {string} version
 */
let projectPath = CONFIG.getKey('projectPath');
let configXmlFile = `${projectPath}/config.xml`;
let version = CONFIG.getKey('version');


fs.readFile(configXmlFile, 'utf8', function (err, stats) {
	if (err) {
		return console.warn(err);
	}

	let result = stats.replace(/version=\"[0-9\.]+"/g, `version="${version}"`);

	fs.writeFile(configXmlFile, result, 'utf8', function (err) {
		if (err) {
			return console.warn(err);
		}

		CONFIG.nctReport({
			type: 'INFO',
			namespace: 'xml-version.js',
			message: `Update the version to ${version}`
		});

	});
});


/*
exec(
	`python ${phythonFile}`,
	CONFIG.onCallback
);

*/
