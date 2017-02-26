'use strict';

/**
 * @author Sven Heddtröm-Lang
 */

module.exports = {

	config: "www/js/Project/app/www/config.json",

	bundleId: 'com.apuerto.myyapp',
	title: 'Myy App',
	projectPath: "_bbuild", // todo solution create folder when '/', mkdir, rm -rf
	platforms: [
		"browser",
		"android",
		"ios"
	],
	plugins: [
		"cordova-plugin-device",
		"cordova-plugin-dialogs"
	]
	/*,

	copyFile: {
		"index.html": "index.html",
		"index2.html": "index2.html"
	},
	copyFolder: {
		"plugins": "www"
	}
	*/

};
