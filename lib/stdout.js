/*
 * stdout.js
 */

'use strict';

var sprintf = require('sprintf');
var colors = require('colors');
var prettyJson = require('prettyjson');
var _ = require('lodash');

var util = require('./util.js');


module.exports = function stdout(info) {
    console.log(sprintf('\n\n[%s] %s %s', util.getCurrentTime(), info.summary.method.green, info.summary.path.red));
    _.forEach(info, function(val, key) {
        console.log(sprintf('\n%s:', key.cyan));
        console.log(prettyJson.render(val));
    })
};