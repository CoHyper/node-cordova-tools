#!/usr/bin/env node

/**
 * @author Sven Hedström-Lang
 * @copyright 2017-02-05
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;
let tmpFile = './build/www/js/tmp.js';
let outFile = './build/www/js/index.js';

exec(
	[
// CONFIG.NODE_SCRIPT.js_lint,
// CONFIG.NODE_SCRIPT.dev_js,
		`uglifyjs ${outFile} --compress > ${tmpFile}`,
		`cp ${tmpFile} ${outFile}`,
		`rm -r ${tmpFile}`
	].join(' && '),
	CONFIG.onCallback
);

