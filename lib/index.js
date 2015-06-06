/*
 * index.js
 */

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var debug = require('debug')('pong-server');
var requestIp = require('request-ip');
var prettyJson = require('prettyjson');
var colors = require('colors');
var sprintf = require('sprintf');


var defaultOpts = {
    host: 'localhost',
    port: 9999,
    routes: [{
        url: '*',
        method: 'GET'
    }, {
        url: '*',
        method: 'POST'
    }]
};


function getContentType(req) {
    var contentType = req.headers['content-type'];

    if (contentType) {
        return contentType.split('/')[1];
    }
}

function getClientInfo(req) {
    var info = {
        summary: {
            method: req.method,
            path: req.url
        },
        headers: req.headers
    };

    if (_.isEmpty(req.body) === false) {
        info.body = req.body;
    }

    if (req.params.length) {
        info.params = req.params;
    }

    if (_.isEmpty(req.query) === false) {
        info.query = req.query;
    }

    var ip = requestIp.getClientIp(req);
    if (ip) {
        info.summary.client_ip = ip;
    }

    var contentType = getContentType(req);
    if (contentType) {
        info.summary.content_type = contentType;
    }


    return info;
}

function getCurrentTime() {
    var now = new Date();

    return sprintf('%d:%d:%d', now.getHours(), now.getMinutes(), now.getSeconds());
}

function stdoutInfo(info) {
    console.log(sprintf('\n\n[%s] %s %s', getCurrentTime(), info.summary.method.green, info.summary.path.red));
    _.forEach(info, function(val, key) {
        console.log(sprintf('\n%s:', key.cyan));
        console.log(prettyJson.render(val));
    })
}

function routeResponse(req, res) {
    var info = getClientInfo(req);

    stdoutInfo(info);

    res.send(info);
}

function bootstrapRoutes(app, routes) {
    _.forEach(routes, function(routeOpts) {
        var method = routeOpts.method.toLowerCase();
        app[method](routeOpts.url, routeResponse);
    });
}

function run(opts) {
    opts = _.extend(defaultOpts, opts);
    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    bootstrapRoutes(app, opts.routes);

    debug('> server listening on: %s:%d', opts.host, opts.port);

    app.listen(opts.port, opts.host);
}

module.exports = run


if (require.main === module) {
    run();
}




