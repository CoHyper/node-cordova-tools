#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

module.exports = {

	/**
	 * @todo delete
	 * @deprecated
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
	 * Return an output to console.
	 *
	 * @param {number} [id=""] - Convert to String.
	 * @param {string} [type=null] - "START", "INFO", "ERROR"
	 * @param {string} [namespace=""]
	 * @param {string} [message=""]
	 */
	nctReport: function({id, type, namespace, message}) {
		id = id ? id.toString() : '';
		type = type ? type : null;
		namespace = namespace ? namespace : '';
		message = message ? message : '';

		const report = this.getKey('report');

		if (this.isObject(report) && report[type.toLocaleLowerCase()]) {
			let msg = `# NCT REPORT: (${namespace}${id}) ${type} ${message}`;

			switch (type) {

				case 'START':
				case 'INFO':
					console.log(msg);
					break;

				case 'ERROR':
				default:
					console.warn(msg);
					break;
			}
		}
	},

	/**
	 * Check exists the key in config json.
	 *
	 * @param {array} args
	 * @param {string} [namespace=null]
	 * @return {boolean} - Returns true when found all args otherwise false.
	 */
	isArgs(args, namespace = null) {
		let that = this;
		let error = [];

		args.forEach(function (key) {

			const item = that.getKey(key);
			const errorMsg = `Missing or invalid key:${key} for namespace:${namespace}.`;

			switch (key) {

				case 'androidAdb':
				case 'bundleId':
				case 'projectPath':
				case 'textEditor':
				case 'title':
				case 'version':
					if (!that.isString(item) && item.length > 0) {
						error.push(errorMsg);
					}
					break;

				case 'platforms':
				case 'plugins':
					if (!that.isArray(item)) {
						error.push(errorMsg);
					}
					break;

				case 'copy':
				// case 'report': // todo - need ?
					if (!that.isObject(item)) {
						error.push(errorMsg);
					}
					break;

				/**
				 * Missing the key in this switch.
				 */
				default:
					error.push(`TODO: ${errorMsg}`);
					break;
			}
		});

		if (error.length) {
			error.forEach(function (item) {
				console.warn(item);
			});

			return false;
		}

		return true;
	},

	/**
	 * Get json file.
	 *
	 * @param {String} jsonFile - The path to the file.
	 * @return {object|null} - Returns a json object otherwise null.
	 */
	getJSONFile(jsonFile) {
		const fs = require('fs');

		let data = fs.readFileSync(jsonFile);
		return JSON.parse(data) || null;
	},

	/**
	 * todo empty string
	 *
	 * @param key
	 * @return {*}
	 * @throws Error
	 */
	getKey: function(key) {
		const DEFAULT_PACKAGE_JSON = 'package.json';
		const DEFAULT_ARGS = 'nodecordovatools';
		let obj = this.getJSONFile(DEFAULT_PACKAGE_JSON);
		let item = obj[DEFAULT_ARGS];
		let file = DEFAULT_PACKAGE_JSON;

		// if object
		if (this.isObject(item)) {
			return item[key];

			// else if string
		} else if (this.isString(item)) {
			file = item;

			// then get other config json
			let args = this.getJSONFile(file);

			// if object
			if (this.isObject(args)) {
				return args[key];
			}
		}

		throw new Error(`The key ${key} not exists in config-file ${file}.`);
	},

	/**
	 * todo check
	 *
	 * @param path
	 */
	deleteFolderRecursive: function(path) {
		const fs = require('fs');
		let files = [];
		if (fs.existsSync(path)) {
			files = fs.readdirSync(path);
			files.forEach(function (file, index) {
				let curPath = path + "/" + file;
				if (fs.lstatSync(curPath).isDirectory()) { // recurse
					this.deleteFolderRecursive(curPath);
				} else { // delete file
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	},

	// ###############
	// ### UTILITY ###
	// ###############

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
	},

	/**
	 * bugfix: spaces in title
	 *
	 * @param value
	 * @return {*|void|string|XML}
	 */
	replaceEmptyString: function(value) {
		return value.replace(/ /g, '\\ ');
	}

};
