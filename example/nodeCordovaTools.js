'use strict';

/**
 * @author Sven Heddtröm-Lang
 */

module.exports = {

	// configJS: '../example/nodeCordovaTools.js'

	bundleId: 'com.apuerto.palmeras',
	title: 'Fonda Las Palmeras',
	version: '1.0.9',

	/**
	 * The path to create the cordova application.
	 * No "/" slash at first or end string.
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
	sassOutput: 'www/css/index.css', // relativ to projectPath
	copy: {
		// input: output // output = relativ to projectPath
		'app/www/index.html': 'www/index.html',
		'app/www/img': 'www'
	},
	eslintrc: '.eslintrc.js',
	eslintFiles: [
		'www/es/App.js'
	],
	jsMinifyOptions: {
		compressor: 'uglifyjs',
		input: [
			'app/www/js/App.js'
		],
		output: 'www/js/app.min.js' // relativ to projectPath
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
