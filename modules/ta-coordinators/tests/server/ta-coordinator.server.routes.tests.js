'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TaCoordinator = mongoose.model('TaCoordinator'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  taCoordinator;

/**
 * Ta coordinator routes tests
 */
describe('Ta coordinator CRUD tests', function () {

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

    // Save a user to the test db and create new Ta coordinator
    user.save(function () {
      taCoordinator = {
        name: 'Ta coordinator name'
      };

      done();
    });
  });

 
  afterEach(function (done) {
    User.remove().exec(function () {
      TaCoordinator.remove().exec(done);
    });
  });
});
