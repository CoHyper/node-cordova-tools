#!/usr/bin/env node

let exec = require('child_process').exec;
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires "Android Device to USB"
 *
 * @param {string} androidAdb - The path to adb. Sometime is in $PATH.
 * @param {string} bundleId
 *
 * @example
 * 		androidAdb: "~/Library/Android/sdk/platform-tools/adb"
 */
let androidAdb = CONFIG.getKey('androidAdb');
let bundleId = CONFIG.getKey('bundleId');

exec(
	`${androidAdb} uninstall ${bundleId}`,
	CONFIG.onCallback
);

