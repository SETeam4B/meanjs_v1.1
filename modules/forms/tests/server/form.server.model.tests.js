'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Form = mongoose.model('Form');

/**
 * Globals
 */
var user,
  form;

/**
 * Unit tests
 */
describe('Form Model Unit Tests:', function() {
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
      form = new Form({
        name: 'Form Name',
        user: user
      });

      done();
    });
  });

  afterEach(function(done) {
    Form.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
