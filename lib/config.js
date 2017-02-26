'use strict';

/**
 * @author Sven Hedström-Lang
 */

module.exports = {

	PARAM: {
		CONFIG: require('./../../nodeCordovaTools.js'),
		DIR_ROOT: './../../'
	},

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
			throw error;
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

		if (this.PARAM.CONFIG[key]) {
			// todo validate (add empty string)

			return this.PARAM.CONFIG[key];
		}

		throw new Error('key (' + key + ') not exists');
	}

};
