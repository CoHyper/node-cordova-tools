#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

let exec = require('child_process').exec;
let fs = require('fs');
let CONFIG = require('./../lib/config');

/**
 * @author Sven Hedström-Lang
 *
 * @requires http://sass-lang.com/install
 */
let projectPath = CONFIG.getKey('projectPath');
let sassInput = CONFIG.PARAM.sassInput;
let sassOutput = CONFIG.PARAM.sassOutput;

exec(
	`sass ${sassInput}:${sassOutput} --sourcemap=none --line-numbers --no-cache`,
	CONFIG.onCallback
);
