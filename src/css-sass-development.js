#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

const OUTPUTSTYLE = 'nested'; // CSS output style (nested | expanded | compact | compressed)
const SOURCECOMMENTS = true;

/**
 * Convert css/scss/sass to css
 */

const CONFIG = require('./../lib/config');
const NAMESPACE = 'css-sass';
const NAMESPACE_ID = CONFIG.getProcessEnvID(); // todo

CONFIG.nctReport({
	type: 'START',
	namespace: NAMESPACE
});


// no need override
let file_1 = 'node-cordova-tools/example/app/www/css/_index.scss'; // todo check exists file
let file_2 = 'node-cordova-tools/example/app/www/css/_index33.css';




if (CONFIG.isArgs(['projectPath'], NAMESPACE)) {

	const sass = require('node-sass');
	const fs = require('fs');
	const projectPath = CONFIG.getKey('projectPath');

	sass.render({
		file: file_1,
		outFile: file_2,
		outputStyle: OUTPUTSTYLE,
		sourceComments: SOURCECOMMENTS
	}, function (err, result) {
		if (err) {
			CONFIG.nctReport({
				id: 1,
				type: 'ERROR',
				namespace: NAMESPACE,
				message: err
			});
			// console.warn(err);

			return;
		}

		fs.writeFile(file_2, result.css.toString(), function (err) {
			if (err) {
				CONFIG.nctReport({
					id: 2,
					type: 'ERROR',
					namespace: NAMESPACE,
					message: err
				});
				// console.warn(err);

				return;
			}

			CONFIG.nctReport({
				type: 'INFO',
				namespace: NAMESPACE,
				message: `Write CSS file ${file_2}.`
			});

		}); // END fs.writeFile()

	});

}
