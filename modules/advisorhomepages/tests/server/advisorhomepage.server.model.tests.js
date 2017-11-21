'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Advisorhomepage = mongoose.model('Advisorhomepage');

/**
 * Globals
 */
var user,
  advisorhomepage;

/**
 * Unit tests
 */
describe('Advisorhomepage Model Unit Tests:', function() {
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
      advisorhomepage = new Advisorhomepage({
        name: 'Advisorhomepage Name',
        user: user
      });

      done();
    });
  });


  afterEach(function(done) {
    Advisorhomepage.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
