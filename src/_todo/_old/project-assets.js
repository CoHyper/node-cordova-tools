#!/usr/bin/env node

/**
 * @author Sven Hedström-Lang
 */

const CONFIG = require('./_config');
const exec = require('child_process').exec;
let inputFolder = './../src/www/assets';
let outputFolder = './../www/assets';

/**
 * 1. Delete old assets folder.
 * 2. Create new assets folder.
 * 3. Copy all files and folder recursive.
 */
exec(
  [
    `rm -rf ${outputFolder}`,
    `mkdir ${outputFolder}`,
    `cp -r ${inputFolder} ${outputFolder}`,
  ].join(' && '),
  CONFIG.onCallback
);
