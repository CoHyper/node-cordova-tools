#!/usr/bin/env node

module.export = {

	"bundleId": "com.apuerto.palmeras",
	"title": "Fonda Las Palmeras",
	"version": "1.0.10",
	"projectPath": "build",
	"platforms": [
		"browser",
		"android",
		"ios"
	],
	"plugins": [
		"cordova-plugin-device",
		"cordova-plugin-dialogs",
		"cordova-plugin-whitelist"
	],
	"sassInput": "www/css/_index.scss",
	"sassOutput": "www/css/index.css",
	"copy": {
		"app/www/index.html": "www/index.html",
		"app/www/img": "www"
	},
	"eslintrc": "tests/.eslintrc.js",
	"eslintFiles": [
		"www/es/App.js"
	],
	"jsMinifyOptions": {
		"compressor": "uglifyjs",
		"input": [
			"app/www/js/App.js"
		],
		"output": "www/js/app.min.js"
	},
	"jsBrowserify": {
		"input": "www/es/App.js",
		"output": "www/es/App.js",
		"options": "--plugins [] --presets [ es2015 ]"
	},
	"buildConfig": "www/js/Project/store/build.json",
	"textEditor": "/usr/local/bin/subl",
	"androidAdb": "~/Library/Android/sdk/platform-tools/adb"

};
