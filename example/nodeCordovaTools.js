'use strict';

/**
 * @author Sven Heddtröm-Lang
 */

module.exports = {

	config: "www/js/Project/app/www/config.json",

	bundleId: 'com.apuerto.myyapp',
	title: 'Myy App',
	projectPath: "_bbuild", // todo create folder when '/'
	platforms: [
		"browser"
	],
	plugins: [
		"cordova-plugin-device",
		"cordova-plugin-dialogs"
	]

};
