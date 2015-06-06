/*
 * index.js
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var debug = require('debug')('pong-server');
var prettyJson = require('prettyjson');
var colors = require('colors');
var sprintf = require('sprintf');


var defaultOpts = require('./defaults.js');


module.exports = function pong(opts) {
    opts = _.extend(defaultOpts, opts);
    var app = require('./app.js')(opts);

    debug('> server listening on: %s:%d', opts.host, opts.port);

    app.listen(opts.port, opts.host);
};


