#!/usr/bin/env node

/**
 * INFO: cant get files from parent root
 *
 * @copyright 2017-02-19
 * @author Sven Hedström-Lang
 * todo need ./../www/js folder is not exists
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;


exec(
	[
		`browserify www/js/App.js -o ./build/www/js/index.js -t [ babelify --plugins [lodash] --presets [ es2015 ] ]`
	].join(' && '),
	CONFIG.onCallback
);
