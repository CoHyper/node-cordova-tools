#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Update the app version in "www/config.xml".
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'xml-version';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'version'], NAMESPACE)) {

	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const version = CONFIG.getKey('version');
	const configXmlFile = `${projectPath}/config.xml`;


	fs.readFile(configXmlFile, 'utf8', function (err, stats) {
		if (err) {
			CONFIG.nctReport({
				type: 'ERROR',
				namespace: NAMESPACE,
				message: err
			});

			return;
		}

		let result = stats.replace(/version=\"[0-9\.]+"/g, `version="${version}"`);

		fs.writeFile(configXmlFile, result, 'utf8', function (err) {
			if (err) {
				CONFIG.nctReport({
					type: 'ERROR',
					namespace: NAMESPACE,
					message: err
				});

				return;
			}

			CONFIG.nctReport({
				type: 'INFO',
				namespace: 'xml-version.js',
				message: `Update the version to ${version}.`
			});

		});
	});

}
