#!/usr/bin/env node

process.title = 'pong';

var path = require('path');
var pongPath = path.join(__dirname, '../lib');

var pong = require(pongPath);

var args = require('../lib/argparse.js')(process.argv);



pong(args);
