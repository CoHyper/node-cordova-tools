'use strict';

/**
 * @author Sven Heddtröm-Lang
 */

module.exports = {

	config: "www/js/Project/app/www/config.json", // todo

	bundleId: 'com.apuerto.palmeras',
	title: 'Fonda Las Palmeras',
	projectPath: "build", // todo solution create folder when '/', mkdir, rm -rf ?
	platforms: [
		"browser",
		"android"
	],
	plugins: [
		"cordova-plugin-device",
		"cordova-plugin-dialogs",
		"cordova-plugin-whitelist"
	],
	sassInput: "www/css/_index.scss",
	sassOutput: "www/css/index.css", // relativ to projectPath
	copy: {
		// relativ to projectPath
		"www/index.html": "www/index.html",
		"www/js/Project/app/www/config.json": "www/config.json",
		"www/js/Project/app/www/favicon.ico": "www/favicon.ico",
		"www/js/Project/app/www/img": "www",
		"www/js/Project/app/platforms": ""
	},
	eslintrc: "./.eslintrc.js",
	eslintFiles: [
		"www/js/App.js",
		"www/js/**/*.js",
		"www/js/Project/www/js/ProjectModule.js",
		"www/js/Project/www/js/ProjectPlugin.js"
	],
	jsMinifyOptions: {
		compressor: "uglifyjs",
		input: [
			"_tmp/*.js"
		],
		output: "www/js/bar.js" // relativ to projectPath
	}

};
