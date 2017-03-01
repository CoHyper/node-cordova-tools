#!/usr/bin/env node

/*
 * node-cordova-tools
 * https://github.com/CoHyper/node-cordova-tools
 *
 * Copyright (c) 2017 Sven Hedström-Lang
 * Licensed under the MIT license.
 */

module.exports = {

	PARAM: {},

	/**
	 * Callback
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
	 * todo - optimize
	 *
	 * @param id
	 * @param type
	 * @param namespace
	 * @param message
	 */
	nctReport: function({id, type, namespace, message}) {
		let types = [
			'INFO',
			'ERROR',
			'ALL'
		];
		id = id ? `${id}, `  : '';
		type = type ? `${type}, ` : '';
		namespace = namespace ? `${namespace}, ` : '';
		message = message ? message : '';
		if (this.getKey('isDebug') || true) { // todo
			//console.log(`NCT REPORT: ${id}${type}${namespace}${message}`);
			console.log(`# NCT REPORT: ${id}${type}${message}`);
		}
	},

	isArgs(args) {
		let error = [];
		let that = this;
		args.forEach(function (key) {
			let item = that.getKey(key);

			switch (key) {

				/**
				 * todo check exists folder
				 */
				case 'nodeModulesDir':
					// todo
					break;

				case 'jsBrowserify':
					// todo
					break;

				/**
				 * todo - check is dir exists ? no ?
				 */
				case 'projectPath':
					if (!that.isString(item)) {
						error.push('Missing ' + key);
					}
					break;

				default:
					error.push('TODO: ' + key + ' not exists');
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
	 * @return {object|null} - Returns a valid json object otherwise null.
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

			// else get other config json
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
	}

};
