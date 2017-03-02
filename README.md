# node-cordova-tools
> BETA


## Require
* NodeJS

## Require Optional
````shell
// js-eslint
npm install --save-dev eslint
 
// node-minify
// https://www.npmjs.com/package/node-minify
npm install --save-dev node-minify

// sass
gem install sass
 
````
## Variables

| Name | Type | - | Description |
|---|----|----|----|
| bundleId | string | | |
| copy | object | | |
| eslintFiles | array | | All files to control. |
| eslintrc | string | | The config file for eslint. Works with JS or JSON. |
| jsMinifyOptions | object | | |
| jsMinifyOptions.compressor | string | | |
| jsMinifyOptions.input | | | |
| jsMinifyOptions.output | | | |
| jsBrowserify | object | | |
| jsBrowserify.input | | | |
| jsBrowserify.output | | | |
| jsBrowserify.options | | | |
| platforms | array | | |
| plugins | array | | |
| projectPath | string | | |
| report | object | | |
| report.start | boolean | | |
| report.info | boolean | | |
| report.error | boolean | | |
| sassInput | | | |
| sassOutput | string | | |
| title | string | | |
| version | string | | |


## Create new project
copy in same of 'node_modules/'
```shell
cp -r node-cordova-tools/example/* ../../
```

## Structur

## Release History

### 2014-02-27 v1.0.0
* beta

