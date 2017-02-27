#!/usr/bin/env node

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
	});
});


/*
exec(
	`python ${phythonFile}`,
	CONFIG.onCallback
);

*/