#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

/**
 * Open the file "<project title>-Info.plist".
 * To edit something. Is haster as search in xCode.
 *
 * e.g.: Add after <dict>
 *     <key>CFBundleLocalizations</key><array><string>de</string></array>
 *     <key>ITSAppUsesNonExemptEncryption</key><false/>
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'open-ios-info-plist';

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});

if (CONFIG.isArgs(['projectPath', 'textEditor', 'title'], NAMESPACE)) {

	const exec = require('child_process').exec;
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');
	const textEditor = CONFIG.getKey('textEditor');
	const title = CONFIG.replaceEmptyString(CONFIG.getKey('title'));
	const iosFolder = `${projectPath}/platforms/ios/${title}`;

	fs.stat(iosFolder, function (err, stats) {

		if (err) {
			CONFIG.nctReport({
				type: 'ERROR',
				namespace: NAMESPACE,
				message: err
			});

			return;
		}

		exec(
			`${textEditor} ${iosFolder}/${title}-Info.plist`,
			function (error, stdout, stderr) {
				if (error) {
					console.warn(stdout);
					console.warn(stderr);
					console.warn(error);
				} else {
					CONFIG.nctReport({
						type: 'INFO',
						namespace: NAMESPACE,
						message: stdout
					});
				}
			}
		);

	});

}
