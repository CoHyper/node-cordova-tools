#!/usr/bin/env node

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
