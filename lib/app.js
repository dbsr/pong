/*
 * server.js
 */
 
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var controllers = require('./controllers.js');
var defaultOpts = require('./defaults.js');



module.exports = function app(opts) {
    // set defaults
    opts = _.extend(defaultOpts, opts);

    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    _.forEach(opts.routes, function(routeOpts) {
        var method = routeOpts.method.toLowerCase();
        app[method](routeOpts.url, controllers.defaultController);
    });

    return app;
};