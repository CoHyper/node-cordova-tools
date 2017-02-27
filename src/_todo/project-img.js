#!/usr/bin/env node

/**
 *
 * @copyright 2016-02-21
 * @author Sven Hedström-Lang
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;

exec(
	[
		'rm ./build/www/img/logo.png || true',
		'cp ./www/js/Project/app/www/favicon.ico ./build/www || true',
		'cp -r ./www/js/Project/app/www/img ./build/www'
	].join(' && '),
	CONFIG.onCallback
);
