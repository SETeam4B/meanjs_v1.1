'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Course = mongoose.model('Course');

/**
 * Globals
 */
var user,
  course;

/**
 * Unit tests
 */
describe('Course Model Unit Tests:', function() {
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
      course = new Course({
        name: 'Course Name',
        user: user
      });

      done();
    });
  });


  afterEach(function(done) {
    Course.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
