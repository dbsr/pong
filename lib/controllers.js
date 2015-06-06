/*
 * controllers.js
 */

'use strict';

var requestParser = require('./request_parser.js');
var stdout = require('./stdout');




exports.defaultController = function defaultController(req, res) {
    var info = requestParser(req);
    stdout(info);

    res.send(info);
}

