'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Assignmentrecommendation = mongoose.model('Assignmentrecommendation'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  assignmentrecommendation;

/**
 * Assignmentrecommendation routes tests
 */
describe('Assignmentrecommendation CRUD tests', function () {

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

    // Save a user to the test db and create new Assignmentrecommendation
    user.save(function () {
      assignmentrecommendation = {
        name: 'Assignmentrecommendation name'
      };

      done();
    });
  });

  it('should be able to save a Assignmentrecommendation if logged in', function (done) {
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

        // Save a new Assignmentrecommendation
        agent.post('/api/assignmentrecommendations')
          .send(assignmentrecommendation)
          .expect(200)
          .end(function (assignmentrecommendationSaveErr, assignmentrecommendationSaveRes) {
            // Handle Assignmentrecommendation save error
            if (assignmentrecommendationSaveErr) {
              return done(assignmentrecommendationSaveErr);
            }

            // Get a list of Assignmentrecommendations
            agent.get('/api/assignmentrecommendations')
              .end(function (assignmentrecommendationsGetErr, assignmentrecommendationsGetRes) {
                // Handle Assignmentrecommendations save error
                if (assignmentrecommendationsGetErr) {
                  return done(assignmentrecommendationsGetErr);
                }

                // Get Assignmentrecommendations list
                var assignmentrecommendations = assignmentrecommendationsGetRes.body;

                // Set assertions
                (assignmentrecommendations[0].user._id).should.equal(userId);
                (assignmentrecommendations[0].name).should.match('Assignmentrecommendation name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Assignmentrecommendation if not logged in', function (done) {
    agent.post('/api/assignmentrecommendations')
      .send(assignmentrecommendation)
      .expect(403)
      .end(function (assignmentrecommendationSaveErr, assignmentrecommendationSaveRes) {
        // Call the assertion callback
        done(assignmentrecommendationSaveErr);
      });
  });

  it('should not be able to save an Assignmentrecommendation if no name is provided', function (done) {
    // Invalidate name field
    assignmentrecommendation.name = '';

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

        // Save a new Assignmentrecommendation
        agent.post('/api/assignmentrecommendations')
          .send(assignmentrecommendation)
          .expect(400)
          .end(function (assignmentrecommendationSaveErr, assignmentrecommendationSaveRes) {
            // Set message assertion
            (assignmentrecommendationSaveRes.body.message).should.match('Please fill Assignmentrecommendation name');

            // Handle Assignmentrecommendation save error
            done(assignmentrecommendationSaveErr);
          });
      });
  });

  it('should be able to update an Assignmentrecommendation if signed in', function (done) {
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

        // Save a new Assignmentrecommendation
        agent.post('/api/assignmentrecommendations')
          .send(assignmentrecommendation)
          .expect(200)
          .end(function (assignmentrecommendationSaveErr, assignmentrecommendationSaveRes) {
            // Handle Assignmentrecommendation save error
            if (assignmentrecommendationSaveErr) {
              return done(assignmentrecommendationSaveErr);
            }

            // Update Assignmentrecommendation name
            assignmentrecommendation.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Assignmentrecommendation
            agent.put('/api/assignmentrecommendations/' + assignmentrecommendationSaveRes.body._id)
              .send(assignmentrecommendation)
              .expect(200)
              .end(function (assignmentrecommendationUpdateErr, assignmentrecommendationUpdateRes) {
                // Handle Assignmentrecommendation update error
                if (assignmentrecommendationUpdateErr) {
                  return done(assignmentrecommendationUpdateErr);
                }

                // Set assertions
                (assignmentrecommendationUpdateRes.body._id).should.equal(assignmentrecommendationSaveRes.body._id);
                (assignmentrecommendationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Assignmentrecommendations if not signed in', function (done) {
    // Create new Assignmentrecommendation model instance
    var assignmentrecommendationObj = new Assignmentrecommendation(assignmentrecommendation);

    // Save the assignmentrecommendation
    assignmentrecommendationObj.save(function () {
      // Request Assignmentrecommendations
      request(app).get('/api/assignmentrecommendations')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Assignmentrecommendation if not signed in', function (done) {
    // Create new Assignmentrecommendation model instance
    var assignmentrecommendationObj = new Assignmentrecommendation(assignmentrecommendation);

    // Save the Assignmentrecommendation
    assignmentrecommendationObj.save(function () {
      request(app).get('/api/assignmentrecommendations/' + assignmentrecommendationObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', assignmentrecommendation.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Assignmentrecommendation with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/assignmentrecommendations/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Assignmentrecommendation is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Assignmentrecommendation which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Assignmentrecommendation
    request(app).get('/api/assignmentrecommendations/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Assignmentrecommendation with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Assignmentrecommendation if signed in', function (done) {
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

        // Save a new Assignmentrecommendation
        agent.post('/api/assignmentrecommendations')
          .send(assignmentrecommendation)
          .expect(200)
          .end(function (assignmentrecommendationSaveErr, assignmentrecommendationSaveRes) {
            // Handle Assignmentrecommendation save error
            if (assignmentrecommendationSaveErr) {
              return done(assignmentrecommendationSaveErr);
            }

            // Delete an existing Assignmentrecommendation
            agent.delete('/api/assignmentrecommendations/' + assignmentrecommendationSaveRes.body._id)
              .send(assignmentrecommendation)
              .expect(200)
              .end(function (assignmentrecommendationDeleteErr, assignmentrecommendationDeleteRes) {
                // Handle assignmentrecommendation error error
                if (assignmentrecommendationDeleteErr) {
                  return done(assignmentrecommendationDeleteErr);
                }

                // Set assertions
                (assignmentrecommendationDeleteRes.body._id).should.equal(assignmentrecommendationSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Assignmentrecommendation if not signed in', function (done) {
    // Set Assignmentrecommendation user
    assignmentrecommendation.user = user;

    // Create new Assignmentrecommendation model instance
    var assignmentrecommendationObj = new Assignmentrecommendation(assignmentrecommendation);

    // Save the Assignmentrecommendation
    assignmentrecommendationObj.save(function () {
      // Try deleting Assignmentrecommendation
      request(app).delete('/api/assignmentrecommendations/' + assignmentrecommendationObj._id)
        .expect(403)
        .end(function (assignmentrecommendationDeleteErr, assignmentrecommendationDeleteRes) {
          // Set message assertion
          (assignmentrecommendationDeleteRes.body.message).should.match('User is not authorized');

          // Handle Assignmentrecommendation error error
          done(assignmentrecommendationDeleteErr);
        });

    });
  });

  it('should be able to get a single Assignmentrecommendation that has an orphaned user reference', function (done) {
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

          // Save a new Assignmentrecommendation
          agent.post('/api/assignmentrecommendations')
            .send(assignmentrecommendation)
            .expect(200)
            .end(function (assignmentrecommendationSaveErr, assignmentrecommendationSaveRes) {
              // Handle Assignmentrecommendation save error
              if (assignmentrecommendationSaveErr) {
                return done(assignmentrecommendationSaveErr);
              }

              // Set assertions on new Assignmentrecommendation
              (assignmentrecommendationSaveRes.body.name).should.equal(assignmentrecommendation.name);
              should.exist(assignmentrecommendationSaveRes.body.user);
              should.equal(assignmentrecommendationSaveRes.body.user._id, orphanId);

              // force the Assignmentrecommendation to have an orphaned user reference
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

                    // Get the Assignmentrecommendation
                    agent.get('/api/assignmentrecommendations/' + assignmentrecommendationSaveRes.body._id)
                      .expect(200)
                      .end(function (assignmentrecommendationInfoErr, assignmentrecommendationInfoRes) {
                        // Handle Assignmentrecommendation error
                        if (assignmentrecommendationInfoErr) {
                          return done(assignmentrecommendationInfoErr);
                        }

                        // Set assertions
                        (assignmentrecommendationInfoRes.body._id).should.equal(assignmentrecommendationSaveRes.body._id);
                        (assignmentrecommendationInfoRes.body.name).should.equal(assignmentrecommendation.name);
                        should.equal(assignmentrecommendationInfoRes.body.user, undefined);

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
      Assignmentrecommendation.remove().exec(done);
    });
  });
});
