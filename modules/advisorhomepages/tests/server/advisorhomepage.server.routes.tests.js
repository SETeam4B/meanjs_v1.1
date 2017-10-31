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

  it('should be able to save a Advisorhomepage if logged in', function (done) {
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

        // Save a new Advisorhomepage
        agent.post('/api/advisorhomepages')
          .send(advisorhomepage)
          .expect(200)
          .end(function (advisorhomepageSaveErr, advisorhomepageSaveRes) {
            // Handle Advisorhomepage save error
            if (advisorhomepageSaveErr) {
              return done(advisorhomepageSaveErr);
            }

            // Get a list of Advisorhomepages
            agent.get('/api/advisorhomepages')
              .end(function (advisorhomepagesGetErr, advisorhomepagesGetRes) {
                // Handle Advisorhomepages save error
                if (advisorhomepagesGetErr) {
                  return done(advisorhomepagesGetErr);
                }

                // Get Advisorhomepages list
                var advisorhomepages = advisorhomepagesGetRes.body;

                // Set assertions
                (advisorhomepages[0].user._id).should.equal(userId);
                (advisorhomepages[0].name).should.match('Advisorhomepage name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Advisorhomepage if not logged in', function (done) {
    agent.post('/api/advisorhomepages')
      .send(advisorhomepage)
      .expect(403)
      .end(function (advisorhomepageSaveErr, advisorhomepageSaveRes) {
        // Call the assertion callback
        done(advisorhomepageSaveErr);
      });
  });

  it('should not be able to save an Advisorhomepage if no name is provided', function (done) {
    // Invalidate name field
    advisorhomepage.name = '';

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

        // Save a new Advisorhomepage
        agent.post('/api/advisorhomepages')
          .send(advisorhomepage)
          .expect(400)
          .end(function (advisorhomepageSaveErr, advisorhomepageSaveRes) {
            // Set message assertion
            (advisorhomepageSaveRes.body.message).should.match('Please fill Advisorhomepage name');

            // Handle Advisorhomepage save error
            done(advisorhomepageSaveErr);
          });
      });
  });

  it('should be able to update an Advisorhomepage if signed in', function (done) {
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

        // Save a new Advisorhomepage
        agent.post('/api/advisorhomepages')
          .send(advisorhomepage)
          .expect(200)
          .end(function (advisorhomepageSaveErr, advisorhomepageSaveRes) {
            // Handle Advisorhomepage save error
            if (advisorhomepageSaveErr) {
              return done(advisorhomepageSaveErr);
            }

            // Update Advisorhomepage name
            advisorhomepage.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Advisorhomepage
            agent.put('/api/advisorhomepages/' + advisorhomepageSaveRes.body._id)
              .send(advisorhomepage)
              .expect(200)
              .end(function (advisorhomepageUpdateErr, advisorhomepageUpdateRes) {
                // Handle Advisorhomepage update error
                if (advisorhomepageUpdateErr) {
                  return done(advisorhomepageUpdateErr);
                }

                // Set assertions
                (advisorhomepageUpdateRes.body._id).should.equal(advisorhomepageSaveRes.body._id);
                (advisorhomepageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Advisorhomepages if not signed in', function (done) {
    // Create new Advisorhomepage model instance
    var advisorhomepageObj = new Advisorhomepage(advisorhomepage);

    // Save the advisorhomepage
    advisorhomepageObj.save(function () {
      // Request Advisorhomepages
      request(app).get('/api/advisorhomepages')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Advisorhomepage if not signed in', function (done) {
    // Create new Advisorhomepage model instance
    var advisorhomepageObj = new Advisorhomepage(advisorhomepage);

    // Save the Advisorhomepage
    advisorhomepageObj.save(function () {
      request(app).get('/api/advisorhomepages/' + advisorhomepageObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', advisorhomepage.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Advisorhomepage with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/advisorhomepages/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Advisorhomepage is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Advisorhomepage which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Advisorhomepage
    request(app).get('/api/advisorhomepages/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Advisorhomepage with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Advisorhomepage if signed in', function (done) {
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

        // Save a new Advisorhomepage
        agent.post('/api/advisorhomepages')
          .send(advisorhomepage)
          .expect(200)
          .end(function (advisorhomepageSaveErr, advisorhomepageSaveRes) {
            // Handle Advisorhomepage save error
            if (advisorhomepageSaveErr) {
              return done(advisorhomepageSaveErr);
            }

            // Delete an existing Advisorhomepage
            agent.delete('/api/advisorhomepages/' + advisorhomepageSaveRes.body._id)
              .send(advisorhomepage)
              .expect(200)
              .end(function (advisorhomepageDeleteErr, advisorhomepageDeleteRes) {
                // Handle advisorhomepage error error
                if (advisorhomepageDeleteErr) {
                  return done(advisorhomepageDeleteErr);
                }

                // Set assertions
                (advisorhomepageDeleteRes.body._id).should.equal(advisorhomepageSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Advisorhomepage if not signed in', function (done) {
    // Set Advisorhomepage user
    advisorhomepage.user = user;

    // Create new Advisorhomepage model instance
    var advisorhomepageObj = new Advisorhomepage(advisorhomepage);

    // Save the Advisorhomepage
    advisorhomepageObj.save(function () {
      // Try deleting Advisorhomepage
      request(app).delete('/api/advisorhomepages/' + advisorhomepageObj._id)
        .expect(403)
        .end(function (advisorhomepageDeleteErr, advisorhomepageDeleteRes) {
          // Set message assertion
          (advisorhomepageDeleteRes.body.message).should.match('User is not authorized');

          // Handle Advisorhomepage error error
          done(advisorhomepageDeleteErr);
        });

    });
  });

  it('should be able to get a single Advisorhomepage that has an orphaned user reference', function (done) {
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

          // Save a new Advisorhomepage
          agent.post('/api/advisorhomepages')
            .send(advisorhomepage)
            .expect(200)
            .end(function (advisorhomepageSaveErr, advisorhomepageSaveRes) {
              // Handle Advisorhomepage save error
              if (advisorhomepageSaveErr) {
                return done(advisorhomepageSaveErr);
              }

              // Set assertions on new Advisorhomepage
              (advisorhomepageSaveRes.body.name).should.equal(advisorhomepage.name);
              should.exist(advisorhomepageSaveRes.body.user);
              should.equal(advisorhomepageSaveRes.body.user._id, orphanId);

              // force the Advisorhomepage to have an orphaned user reference
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

                    // Get the Advisorhomepage
                    agent.get('/api/advisorhomepages/' + advisorhomepageSaveRes.body._id)
                      .expect(200)
                      .end(function (advisorhomepageInfoErr, advisorhomepageInfoRes) {
                        // Handle Advisorhomepage error
                        if (advisorhomepageInfoErr) {
                          return done(advisorhomepageInfoErr);
                        }

                        // Set assertions
                        (advisorhomepageInfoRes.body._id).should.equal(advisorhomepageSaveRes.body._id);
                        (advisorhomepageInfoRes.body.name).should.equal(advisorhomepage.name);
                        should.equal(advisorhomepageInfoRes.body.user, undefined);

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
      Advisorhomepage.remove().exec(done);
    });
  });
});
