#!/usr/bin/env node

/**
 * @author Sven Hedström-Lang
 * @requires ./manual/.esdoc.json
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;
const fs = require('fs');

let esdoc = './manual/.esdoc.json';
let jsonContent = CONFIG.getJSONFile(esdoc);


exec([
		`rm -rf ${jsonContent.destination} || true`,
		`./node_modules/.bin/esdoc -c ${esdoc} && open ${jsonContent.destination}/index.html`
	].join(' && '),
	CONFIG.onCallback
);
