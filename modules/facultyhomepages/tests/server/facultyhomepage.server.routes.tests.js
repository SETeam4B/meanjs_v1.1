'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Facultyhomepage = mongoose.model('Facultyhomepage'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  facultyhomepage;

/**
 * Facultyhomepage routes tests
 */
describe('Facultyhomepage CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Facultyhomepage
    user.save(function () {
      facultyhomepage = {
        name: 'Facultyhomepage name'
      };

      done();
    });
  });



  afterEach(function (done) {
    User.remove().exec(function () {
      Facultyhomepage.remove().exec(done);
    });
  });
});
