#!/usr/bin/env node

/**
 * INFO: cant get files from parent root
 *
 * @author Sven Hedström-Lang
 * todo need ./../www/js folder is not exists
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;
let fileOut = `./../build/www/js/index.min.js`;


//CONFIG.removeFile(fileOut);

exec(
	'cp -r ./www/cordova.js ./../build/www',
	CONFIG.onCallback
);
