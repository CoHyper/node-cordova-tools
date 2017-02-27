#!/usr/bin/env node

/**
 * @author Sven Hedström-Lang
 */

module.exports = {

	PARAM: {
		// CONFIGJS: require('./../../nodeCordovaTools.js')
		CONFIGJS: require('./../example/nodeCordovaTools.js') // todo
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
			console.warn(stdout);
			console.warn(stderr);
			console.warn(error);
		} else {
			console.log(stdout);
		}
	},

	/**
	 * Require for js-min.js
	 */
	onCallbackEmpty: function () {},

	/**
	 *
	 * @param {string} key
	 * @return {*}
	 * @throws Error
	 */
	getKey: function (key) {
		let item = this.PARAM.CONFIGJS[key];

		if (item) {

			return item;

		} else if (this.utility.isString(item) && item.length === 0) {

			// bugfix: returns empty string
			return '';
		}

		throw new Error(`The key ${key} not exists.`);
	},

	utility: {

		/**
		 * Checks whether the given value is a string.
		 *
		 * @copyright 04.09.16
		 * @param {*} value - The value to check
		 * @return {Boolean} Returns true if the given value is a string, otherwise false
		 */
		isString(value) {
			return typeof value == 'string' || (this._isObjectLike(value) && Object.prototype.toString.call(value) == '[object String]');
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
		 * @return {Boolean} Returns true if the given value is an object, otherwise false
		 */
		isObject(value) {
			return !!value && (typeof value == 'object' || typeof value == 'function');
		}
	}

};
