#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

let exec = require('child_process').exec;
let CONFIG = require('./../lib/config');

/**
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

