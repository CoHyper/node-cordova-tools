#!/usr/bin/env node

/**
 * INFO: cant get files from parent root
 *
 * @author Sven Hedström-Lang
 * todo need ./build/ folder is not exists
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;


//CONFIG.removeFile(fileOut);

exec(
	'cp ./www/js/Project/app/config.xml ./build/config.xml',
	CONFIG.onCallback
);
