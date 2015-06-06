/*
 * util.js
 */

'use strict';

var sprintf = require('sprintf');

exports.getContentType = function getContentType(req) {
    var contentType = req.headers['content-type'];

    if (contentType) {
        return contentType.split('/')[1];
    }
};

exports.getCurrentTime = function getCurrentTime() {
    var now = new Date();

    return sprintf('%d:%d:%d', now.getHours(), now.getMinutes(), now.getSeconds());
};

