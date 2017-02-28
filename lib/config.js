#!/usr/bin/env node

/**
 * @author Sven Hedström-Lang
 */

module.exports = {

	PARAM: {},

	/**
	 * callback
	 *
	 * @param error
	 * @param stdout
	 * @param stderr
	 */
	onCallback: function (error, stdout, stderr) {
		if (error) {
			console.warn(stdout);
			console.warn(stderr);
			console.warn(error);
		} else {
			console.log(stdout);
		}
	},

	/**
	 * todo - not used
	 *
	 * @param {String} jsonFile - The file.
	 */
	getJSONFile(jsonFile) {
		const fs = require('fs');

		let data = fs.readFileSync(jsonFile);
		return JSON.parse(data);
	},

	/**
	 *
	 * @param {string} key
	 * @return {*}
	 * @throws Error
	 */
	getKey: function (key) {
		const DEFAULT_CONFIGJS = '../../nct.config.js';

		let item = require(DEFAULT_CONFIGJS);
		let configJS = item['configJS'];
		if (configJS) {
			item = require(configJS);
		}

		console.log(item);
		console.log(`INFO: getKey('${key}') >`, item[key]); // todo

		if (item[key]) {

			return item[key];

		} else if (this.utility.isString(item[key]) && item[key].length === 0) {

			// bugfix: returns empty string
			return '';
		}

		throw new Error(`The key ${key} not exists.`);
	},

	utility: {

		/**
		 * Checks whether the given value is a string.
		 *
		 * @param {*} value - The value to check
		 * @return {Boolean} Returns true if the given value is a string, otherwise false
		 */
		isString(value) {
			return typeof value == 'string' || (this.isObjectLike(value) && Object.prototype.toString.call(value) == '[object String]');
		},

		/**
		 * @param {*} value
		 * @return {boolean}
		 */
		isArray: function (value) {
			return Array.isArray(value);
		},

		/**
		 * @param {string} str
		 * @param {array} arr
		 * @return {boolean}
		 * @example
		 *    isStringInArray("ios", ["android", "ios"]);
		 *    // -> true
		 */
		isStringInArray(str, arr) {
			return arr.indexOf(str) >= 0;
		},

		/**
		 * Checks whether the given value is an object
		 *
		 * @param {*} value - The value to check
		 * @return {boolean} Returns true if the given value is an object, otherwise false
		 */
		isObject(value) {
			return !!value && (typeof value == 'object' || typeof value == 'function');
		},

		/**
		 * Checks whether the given value is object-like
		 *
		 * @param {*} value - The value to check
		 * @return {boolean} Returns true if the given value is object-like, otherwise false
		 */
		isObjectLike(value) {
			return !!value && typeof value == 'object';
		}
	}

};
