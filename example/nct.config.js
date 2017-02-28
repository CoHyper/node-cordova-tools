'use strict';

/**
 * @author Sven Heddtröm-Lang
 */

console.log('found the default config file'); // todo


module.exports = {

	/**
	 * If this set : all other variable ignore.
	 */
	// const DEFAULT_CONFIGJS = '../../nct.config.js';

	// configJS: 'node-cordova-tools/tests/nct.config,js',
	// configJS: '../node-cordova-tools/tests/nct2.config,js',
	// configJS: '../../node-cordova-tools/tests/nct2.config,js', // ####
	// configJS: 'tests/nct.config,js',
	configJS: '../tests/nct2.config.js',// ####
	// configJS: '../../tests/nct2.config.js',

	/**
	 * @type string
	 */
	bundleId: 'com.apuerto.palmeras',

	/**
	 * @type string
	 */
	title: 'Fonda Las Palmeras',

	/**
	 * @type string
	 */
	version: '1.0.10',

	/**
	 * The path to create a cordova application.
	 * No "/" slash at first or end.
	 *
	 * @type string
	 */
	projectPath: 'build',

	/**
	 * @type array
	 */
	platforms: [
		'browser',
		'android',
		'ios'
	],

	/**
	 * @type array
	 */
	plugins: [
		'cordova-plugin-device',
		'cordova-plugin-dialogs',
		'cordova-plugin-whitelist'
	],
	sassInput: 'www/css/_index.scss',

	/**
	 * @type string - Relativ to projectPath.
	 */
	sassOutput: 'www/css/index.css',
	copy: {
		// input: output // output = relativ to projectPath
		'app/www/index.html': 'www/index.html',
		'app/www/img': 'www'
	},
	eslintrc: '.eslintrc.js',
	eslintFiles: [
		'www/es/App.js'
	],

	/**
	 * @type object
	 * @param {string} compressor
	 * @param {array} input
	 * @param {string} output - Relativ to projectPath.
	 */
	jsMinifyOptions: {
		compressor: 'uglifyjs',
		input: [
			'app/www/js/App.js'
		],
		output: 'www/js/app.min.js'
	},
	jsBrowserify: {
		input: 'www/es/App.js',
		output: 'www/es/App.js', // relativ to projectPath
		options: '--plugins [] --presets [ es2015 ]'
	},
	buildConfig: 'www/js/Project/store/build.json',

	textEditor: '/usr/local/bin/subl',
	androidAdb: '~/Library/Android/sdk/platform-tools/adb'

};
