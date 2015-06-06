/*
 * mirror.js
 */

'use strict';

var _ = require('lodash');
var requestIp = require('request-ip');

var util = require('./util.js');

module.exports = function(req) {
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

    var contentType = util.getContentType(req);
    if (contentType) {
        info.summary.content_type = contentType;
    }


    return info;
};