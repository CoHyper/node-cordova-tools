'use strict';

/**
 * @author Sven Hedström-Lang
 */

module.exports = {

	PARAM: {
		// CONFIGJS: require('./../../nodeCordovaTools.js')
		CONFIGJS: require('./../example/nodeCordovaTools.js')
	},

	VALID_KEYS: [
		'projectPath'
	],

	/**
	 * callback
	 *
	 * @param error
	 * @param stdout
	 * @param stderr
	 */
	onCallback: function (error, stdout, stderr) {
		if (error) {
			console.log(stdout);
			console.log(stderr);
			console.log(error);
		} else {
			console.log(stdout);
		}
	},

	/**
	 * not used
	 *
	 * @param {string} jsonFile - The file.
	 */
	getJSONFile(jsonFile) {
		const fs = require('fs');

		let contents = fs.readFileSync(jsonFile);
		return JSON.parse(contents);
	},

	/**
	 *
	 * @param {string} key
	 * @return {*}
	 */
	getKey: function (key) {

		if (this.PARAM.CONFIGJS[key]) {

			// todo validate (add empty string)
			return this.PARAM.CONFIGJS[key];
		}

		throw new Error('key (' + key + ') not exists');
	}

};
