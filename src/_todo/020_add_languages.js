#!/usr/bin/env node

var fs = require('fs');
var wrench = require('wrench');

var appLanguagePath = 'i18n';
var buildLanguagePath = 'www/i18n';

removeOldFiles();

function removeOldFiles() {
  fs.access(buildLanguagePath, function(err) {
    if (!err) {
      console.log('\x1b[33m' + 'Remove old files from previous build', '\x1b[0m');
      wrench.rmdirSyncRecursive(buildLanguagePath);
      console.log('\x1b[33m' + 'All files removed', '\x1b[0m');
    }
    copyFiles();
  });
}

function copyFiles() {
  prepareFolders(buildLanguagePath, copyContent);

  function copyContent() {
    fs.access(appLanguagePath, function(err) {
      if (err) {
        console.log('\x1b[34m' + 'Warning! No files to copy', '\x1b[0m \n');
        return;
      }
      console.log('\x1b[33m' + 'Copy new files to build folder', '\x1b[0m');
      wrench.copyDirSyncRecursive(appLanguagePath, buildLanguagePath);
      console.log('\x1b[33m' + 'All files copied', '\x1b[0m \n');
    })
  }
}

function prepareFolders(pathArr, callback, curParh) {
  pathArr = (pathArr.pop) ? pathArr : pathArr.split('/');
  curParh = (!curParh) ? pathArr.shift() : curParh + '/' + pathArr.shift();

  fs.access(curParh, function(err) {
    if (err) {
      fs.mkdirSync(curParh);
    }
    if (pathArr[1]) {
      prepareFolders(pathArr, callback, curParh)
    } else {
      callback();
    }
  })
}
