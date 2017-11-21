'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Assignmentrecommendation = mongoose.model('Assignmentrecommendation');

/**
 * Globals
 */
var user,
  assignmentrecommendation;

/**
 * Unit tests
 */
describe('Assignmentrecommendation Model Unit Tests:', function() {
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
      assignmentrecommendation = new Assignmentrecommendation({
        name: 'Assignmentrecommendation Name',
        user: user
      });

      done();
    });
  });

  afterEach(function(done) {
    Assignmentrecommendation.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
