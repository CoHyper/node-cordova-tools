'use strict';

/**
 * @author Sven Hedström-Lang
 */

const CONFIG = require('./../_config');
const exec = require('child_process').exec;

exec([
  `cp -r ${CONFIG.FILE_CONFIG_XML_COPY} ${CONFIG.DIR_BUILD}`,
  `python ${CONFIG.FILE_CONFIG_XML_PYTHON}`
  ].join(' && '),
  CONFIG.onCallback
);
