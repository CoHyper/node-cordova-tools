
/**
 * @author Sven Heddtröm-Lang
 */


module.exports = {

	/**
	 * @type object
	 * @default undefined
	 */
	"report": {
		"start": true,
		"error": true,
		"info": true,
		"end": true
	},

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

	/**
	 * @type object
	 * @example
	 * 		"copy": {
	 * 			// input : output	(relativ to projectPath)
	 * 			"app/www/index.html": "www/index.html",
	 * 		}
	 */
	copy: {
		'app/www/index.html': 'www/index.html',
		'app/www/img': 'www'
	},

	/**
	 * @type string
	 * @description The config file for eslint. Works with JS or JSON.
	 */
	eslintrc: '.eslintrc.js',

	/**
	 * @type array
	 * @description All files to control.
	 */
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

	/**
	 * todo
	 */
	jsBrowserify: {
		input: 'www/es/App.js',
		output: 'www/es/App.js', // relativ to projectPath
		options: '--plugins [] --presets [ es2015 ]'
	},

	buildConfig: 'www/js/Project/store/build.json',

	/**
	 * @type string
	 * @description To open a file in an IDE.
	 */
	textEditor: '/usr/local/bin/subl',

	/**
	 * @type string
	 */
	androidAdb: '~/Library/Android/sdk/platform-tools/adb',

	/**
	 * @type string
	 */
	nodeModulesDir: 'node_modules'

};
