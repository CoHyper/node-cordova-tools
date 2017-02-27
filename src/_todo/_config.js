'use strict';

/**
 * @author Sven Hedström-Lang
 * @copyright 2014-03-14
 */

module.exports = {

	/**
	 *
	 */
	FILES: {
		css: [],
		css_input_output: "www/css/_index.scss:build/www/css/index.css",
		// for 'js-lint'
		js: [
			"www/js/App.js",
			"www/js/**/*.js",
			"www/js/Project/www/js/ProjectModule.js",
			"www/js/Project/www/js/ProjectPlugin.js"
		]
	},
/*

	 FILE_CONFIG_XML_COPY: 'app/config.xml',
	 FILE_CONFIG_XML_PYTHON: 'hyper-core/hooks/configXML.py',
	 FILE_PACKAGE_JSON: './package.json',
	 FILE_FAVICON: 'app/www/favicon.ico',
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


	/* OLD

	 filePackageJson: './package.json',
	 fileConfigJson: './../app/www/json/config.json',
	 fileConfigXml: './../app/config.xml',
	 fileFavicon: './../app/www/favicon.ico',
	 fileBuildJson: './../build/www/config.json',
	 fileHtml: './../build/www/index.html',

	 DIR_PROJECT: './..',
	 DIR_BUILD: './../build',
	 DIR_BUILD_PLATFORMS: './../build/platforms',
	 DIR_BUILD_WWW: './../build/www',
	 DIR_BUILD_WWW_CSS: './../build/www/css',
	 DIR_BUILD_WWW_CSS_FONTS: './../build/www/css/fonts',
	 DIR_BUILD_WWW_IMG: './../build/www/img',
	 DIR_BUILD_WWW_JS: './../build/www/js',
	 DIR_BUILD_WWW_JSON: './../build/www/json',
	 DIR_BUILD_DOCS: './../build/docs', // for tasks exec-lint-documentation
	 DIR_CONFIG_APP: './../app',
	 DIR_CONFIG_APP_PLATFORMS: './../app/platforms',
	 DIR_CONFIG_APP_WWW: './../app/www',
	 DIR_CONFIG_APP_WWW_CSS: './../app/www/css',
	 DIR_CONFIG_APP_WWW_CSS_FONTS: './../app/www/css/fonts',
	 DIR_CONFIG_APP_WWW_IMG: './../app/www/img',
	 DIR_CONFIG_APP_WWW_JSON: './../app/www/json',
	 DIR_DOCS: './docs/source',
	 DIR_SOURCE_CORDOVA: './source/cordova',
	 DIR_SOURCE_CORE: './source/core',
	 DIR_SOURCE_IMAGES: './source/images',
	 DIR_SOURCE_LANGUAGES: './source/languages',
	 DIR_SOURCE_LIBS: './source/libs',
	 DIR_SOURCE_MENUS: './source/menus',
	 DIR_SOURCE_MODULES: './source/modules',
	 DIR_SOURCE_STYLES: './source/styles',

	 CORE_FILES: [
	 './source/core/App.js'
	 ],
	 */

	/**
	 *
	 * @param {Array} input
	 * @param {String} [output="config.json"]
	 * @param {Object} [options]
	 * @param {*} [options.replacer=null]
	 * @param {String} [options.space="\t"]
	 * @example
	 * mergeJson(['home.json', 'print.json']);
	 */
	mergeJson: function (input = [], output = 'config.json', options = {replacer: null, space: '\t'}) {
		const fs = require('fs');
		const _ = require('lodash');
		let json = {};

		input.forEach(function (item, index) {

			fs.readFile(item, 'utf8', function (err, data) {
				if (err) {
					throw err;
				}

				let newJsonData = JSON.parse(data);

				for (let key in newJsonData) {
					if (newJsonData.hasOwnProperty(key)) {

						// check if exists
						if (json.hasOwnProperty(key)) {

							if (Array.isArray(json[key]) && Array.isArray(newJsonData[key])) {
								json[key].push(newJsonData[key][0]);
							} else if (_.isObject(json[key]) && _.isObject(newJsonData[key])) {
								json = _.merge(json, newJsonData);
							} else {
								console.log('############');
								console.log('### TODO : mergeJson() - _config.js');
								console.log('############');
							}
						} else {

							// init new key
							json[key] = newJsonData[key];
						}

					}
				}

				// require to save file each changes
				fs.writeFile(output, JSON.stringify(json, options.replacer, options.space), function (err) {
					if (err) {
						throw err;
					}
				});

			}); // end readFile

		}); // end forEach(input)

	},

	/**
	 * Get a list of all files from a folder recursively.
	 *
	 * @param {String} dir - The path of the directory folder
	 * @param {Array} [filelist=[]] - The list of all files
	 * @return {Array} - Returns the list of all files
	 */
	walkSync: function (dir, filelist = []) {
		const fs = require('fs');
		let item;
		let that = this;

		fs.readdirSync(dir).forEach(function (file) {
			item = dir + '/' + file;
			if (fs.statSync(item).isDirectory()) {
				filelist = that.walkSync(item, filelist);
			} else if (fs.statSync(item).isFile()) {
				// console.log('add ' + item);
				filelist.push(item);
			}
		});

		return filelist;
	},

	getExtname: function (arr, extname) {
		const path = require('path');
		let tmp = [];

		arr.forEach(function (item, index) {
			if (path.extname(item) === extname) {
				tmp.push(item);
			}
		});

		return tmp;
	},

	/**
	 *
	 * @param {String} folder
	 */
	removeFolder: function (folder) {
		const exec = require('child_process').exec;

		exec(
			`rm -rf ${folder}`,
			this.onCallback
		);
	},

	/**
	 *
	 * @param {String} jsonFile - The file.
	 */
	getJSONFile(jsonFile) {
		const fs = require('fs');

		let contents = fs.readFileSync(jsonFile);
		return JSON.parse(contents);
	},

	getProjectConfigJson() {
		return this.getJSONFile('./www/js/Project/app/www/config.json');
	}

};
