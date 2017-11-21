'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TaCoordinator = mongoose.model('TaCoordinator');

/**
 * Globals
 */
var user,
  taCoordinator;

/**
 * Unit tests
 */
describe('Ta coordinator Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      taCoordinator = new TaCoordinator({
        name: 'Ta coordinator Name',
        user: user
      });

      done();
    });
  });


  afterEach(function(done) {
    TaCoordinator.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
