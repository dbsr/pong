/*
 * argparse.js
 */

'use strict';

var argparse = require('commander');


module.exports = function(args) {
    argparse
        .option('-H, --host <hostname>', 'hostname')
        .option('-p, --port <port>', 'port', parseInt)
        .parse(args);

    return argparse;
};