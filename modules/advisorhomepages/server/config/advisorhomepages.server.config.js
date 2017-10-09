'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Advisorhomepages module init function.
 */
module.exports = function (app, db) {
    db: {
        uri: 'mongodb://yoyis:willis@ds115045.mlab.com:15045/testsoftwareproject' //place the URI of your mongo database here.
    }
};
