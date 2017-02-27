'use strict';

/**
 * @author Sven Hedström-Lang
 * @copyright 24.08.16
 */

const CONFIG = require('./../_config');
const fs = require('fs');
const exec = require('child_process').exec;

fs.readFile(CONFIG.FILE_PACKAGE_JSON, 'utf8', function(err, data) {

  if (err) {
    throw err;
  }

  let jsonData = JSON.parse(data);
  let bundleId = jsonData['bundleId'];
  let plugins = jsonData['plugins'];
  let platforms = jsonData['platforms'];

  exec(
    [
      `cd ${CONFIG.DIR_BUILD}`,
      `./../node_modules/.bin/cordova plugin add ${plugins.join(' ')} --save`,
      `./../node_modules/.bin/cordova platform add ${platforms.join(' ')} --save`
    ].join(' && '),
    CONFIG.onCallback
  );

  /**
   * write es6 with plugins and platforms for project.
   */
  let out = `'use strict';

/**
 * Require for config.js.
 *
 * @author Sven Hedström-Lang
 * @copyright ${new Date()} - Generate by NodeJS.
 */

export let bundleId = "${bundleId}";

export let plugins = [\n\t"${plugins.join('",\n\t"')}"\n];

export let platforms = [\n\t"${platforms.join('",\n\t"')}"\n];

`;

  fs.writeFile(CONFIG.DIR_APP_WWW_CONFIG + '/package_copy.js', out, function (err) {
    if (err) {
      throw err;
    }
  });

});
