'use strict';

/**
 * @author Sven Heddtröm-Lang
 */

module.exports = {

	config: "www/js/Project/app/www/config.json",

	bundleId: 'com.apuerto.myyapp',
	title: 'Myy App',
	projectPath: "_build", // todo solution create folder when '/', mkdir, rm -rf
	platforms: [
		"browser",
		"android",
		"ios"
	],
	plugins: [
		"cordova-plugin-device",
		"cordova-plugin-dialogs"
	],
	sassInput: "app/www/css/_index.scss",
	sassOutput: "www/css/index.css", // relativ to projectPath
	copy: {
		// relativ to projectPath
		"www/index.html": "www/index.html",
		"www/js/Project/app/www/favicon.ico": "www/favicon.ico",
		"www/js/Project/app/www/config.json": "www/config.json",
		"www/js/Project/app/www/img": "www",
		"www/js/Project/app/platforms": ""
	}

};
