#!/usr/bin/env node

const exec = require('child_process').exec;
const CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires npm install -g cordova
 *
 * @param {string} projectPath
 * @param {string} bundleId
 * @param {string} title
 */
let projectPath = CONFIG.PARAM.DIR_ROOT + CONFIG.getKey('projectPath');
let bundleId = CONFIG.getKey('bundleId');
let title = CONFIG.getKey('title');

exec(
	`cordova create ${projectPath} ${bundleId} '${title}'`,
	CONFIG.onCallback
);
