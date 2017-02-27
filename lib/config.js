'use strict';

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
	 */
	getKey: function (key) {

		if (this.PARAM.CONFIGJS[key]) {

			// todo validate (add empty string)
			return this.PARAM.CONFIGJS[key];
		}

		throw new Error(`The key ${key} not exists.`);
	},

	utility: {

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
