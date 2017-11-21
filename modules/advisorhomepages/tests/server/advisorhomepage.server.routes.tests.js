'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Advisorhomepage = mongoose.model('Advisorhomepage'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  advisorhomepage;

/**
 * Advisorhomepage routes tests
 */
describe('Advisorhomepage CRUD tests', function () {

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

    // Save a user to the test db and create new Advisorhomepage
    user.save(function () {
      advisorhomepage = {
        name: 'Advisorhomepage name'
      };

      done();
    });
  });

 

  afterEach(function (done) {
    User.remove().exec(function () {
      Advisorhomepage.remove().exec(done);
    });
  });
});
