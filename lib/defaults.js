/*
 * defaults.js
 */

'use strict';

module.exports = {
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