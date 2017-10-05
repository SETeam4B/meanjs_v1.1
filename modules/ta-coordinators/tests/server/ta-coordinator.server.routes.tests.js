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

  it('should be able to save a Ta coordinator if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ta coordinator
        agent.post('/api/taCoordinators')
          .send(taCoordinator)
          .expect(200)
          .end(function (taCoordinatorSaveErr, taCoordinatorSaveRes) {
            // Handle Ta coordinator save error
            if (taCoordinatorSaveErr) {
              return done(taCoordinatorSaveErr);
            }

            // Get a list of Ta coordinators
            agent.get('/api/taCoordinators')
              .end(function (taCoordinatorsGetErr, taCoordinatorsGetRes) {
                // Handle Ta coordinators save error
                if (taCoordinatorsGetErr) {
                  return done(taCoordinatorsGetErr);
                }

                // Get Ta coordinators list
                var taCoordinators = taCoordinatorsGetRes.body;

                // Set assertions
                (taCoordinators[0].user._id).should.equal(userId);
                (taCoordinators[0].name).should.match('Ta coordinator name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ta coordinator if not logged in', function (done) {
    agent.post('/api/taCoordinators')
      .send(taCoordinator)
      .expect(403)
      .end(function (taCoordinatorSaveErr, taCoordinatorSaveRes) {
        // Call the assertion callback
        done(taCoordinatorSaveErr);
      });
  });

  it('should not be able to save an Ta coordinator if no name is provided', function (done) {
    // Invalidate name field
    taCoordinator.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ta coordinator
        agent.post('/api/taCoordinators')
          .send(taCoordinator)
          .expect(400)
          .end(function (taCoordinatorSaveErr, taCoordinatorSaveRes) {
            // Set message assertion
            (taCoordinatorSaveRes.body.message).should.match('Please fill Ta coordinator name');

            // Handle Ta coordinator save error
            done(taCoordinatorSaveErr);
          });
      });
  });

  it('should be able to update an Ta coordinator if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ta coordinator
        agent.post('/api/taCoordinators')
          .send(taCoordinator)
          .expect(200)
          .end(function (taCoordinatorSaveErr, taCoordinatorSaveRes) {
            // Handle Ta coordinator save error
            if (taCoordinatorSaveErr) {
              return done(taCoordinatorSaveErr);
            }

            // Update Ta coordinator name
            taCoordinator.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ta coordinator
            agent.put('/api/taCoordinators/' + taCoordinatorSaveRes.body._id)
              .send(taCoordinator)
              .expect(200)
              .end(function (taCoordinatorUpdateErr, taCoordinatorUpdateRes) {
                // Handle Ta coordinator update error
                if (taCoordinatorUpdateErr) {
                  return done(taCoordinatorUpdateErr);
                }

                // Set assertions
                (taCoordinatorUpdateRes.body._id).should.equal(taCoordinatorSaveRes.body._id);
                (taCoordinatorUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Ta coordinators if not signed in', function (done) {
    // Create new Ta coordinator model instance
    var taCoordinatorObj = new TaCoordinator(taCoordinator);

    // Save the taCoordinator
    taCoordinatorObj.save(function () {
      // Request Ta coordinators
      request(app).get('/api/taCoordinators')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ta coordinator if not signed in', function (done) {
    // Create new Ta coordinator model instance
    var taCoordinatorObj = new TaCoordinator(taCoordinator);

    // Save the Ta coordinator
    taCoordinatorObj.save(function () {
      request(app).get('/api/taCoordinators/' + taCoordinatorObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', taCoordinator.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ta coordinator with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/taCoordinators/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ta coordinator is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ta coordinator which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ta coordinator
    request(app).get('/api/taCoordinators/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ta coordinator with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ta coordinator if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Ta coordinator
        agent.post('/api/taCoordinators')
          .send(taCoordinator)
          .expect(200)
          .end(function (taCoordinatorSaveErr, taCoordinatorSaveRes) {
            // Handle Ta coordinator save error
            if (taCoordinatorSaveErr) {
              return done(taCoordinatorSaveErr);
            }

            // Delete an existing Ta coordinator
            agent.delete('/api/taCoordinators/' + taCoordinatorSaveRes.body._id)
              .send(taCoordinator)
              .expect(200)
              .end(function (taCoordinatorDeleteErr, taCoordinatorDeleteRes) {
                // Handle taCoordinator error error
                if (taCoordinatorDeleteErr) {
                  return done(taCoordinatorDeleteErr);
                }

                // Set assertions
                (taCoordinatorDeleteRes.body._id).should.equal(taCoordinatorSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ta coordinator if not signed in', function (done) {
    // Set Ta coordinator user
    taCoordinator.user = user;

    // Create new Ta coordinator model instance
    var taCoordinatorObj = new TaCoordinator(taCoordinator);

    // Save the Ta coordinator
    taCoordinatorObj.save(function () {
      // Try deleting Ta coordinator
      request(app).delete('/api/taCoordinators/' + taCoordinatorObj._id)
        .expect(403)
        .end(function (taCoordinatorDeleteErr, taCoordinatorDeleteRes) {
          // Set message assertion
          (taCoordinatorDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ta coordinator error error
          done(taCoordinatorDeleteErr);
        });

    });
  });

  it('should be able to get a single Ta coordinator that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Ta coordinator
          agent.post('/api/taCoordinators')
            .send(taCoordinator)
            .expect(200)
            .end(function (taCoordinatorSaveErr, taCoordinatorSaveRes) {
              // Handle Ta coordinator save error
              if (taCoordinatorSaveErr) {
                return done(taCoordinatorSaveErr);
              }

              // Set assertions on new Ta coordinator
              (taCoordinatorSaveRes.body.name).should.equal(taCoordinator.name);
              should.exist(taCoordinatorSaveRes.body.user);
              should.equal(taCoordinatorSaveRes.body.user._id, orphanId);

              // force the Ta coordinator to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Ta coordinator
                    agent.get('/api/taCoordinators/' + taCoordinatorSaveRes.body._id)
                      .expect(200)
                      .end(function (taCoordinatorInfoErr, taCoordinatorInfoRes) {
                        // Handle Ta coordinator error
                        if (taCoordinatorInfoErr) {
                          return done(taCoordinatorInfoErr);
                        }

                        // Set assertions
                        (taCoordinatorInfoRes.body._id).should.equal(taCoordinatorSaveRes.body._id);
                        (taCoordinatorInfoRes.body.name).should.equal(taCoordinator.name);
                        should.equal(taCoordinatorInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      TaCoordinator.remove().exec(done);
    });
  });
});
