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

  it('should be able to save a Facultyhomepage if logged in', function (done) {
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

        // Save a new Facultyhomepage
        agent.post('/api/facultyhomepages')
          .send(facultyhomepage)
          .expect(200)
          .end(function (facultyhomepageSaveErr, facultyhomepageSaveRes) {
            // Handle Facultyhomepage save error
            if (facultyhomepageSaveErr) {
              return done(facultyhomepageSaveErr);
            }

            // Get a list of Facultyhomepages
            agent.get('/api/facultyhomepages')
              .end(function (facultyhomepagesGetErr, facultyhomepagesGetRes) {
                // Handle Facultyhomepages save error
                if (facultyhomepagesGetErr) {
                  return done(facultyhomepagesGetErr);
                }

                // Get Facultyhomepages list
                var facultyhomepages = facultyhomepagesGetRes.body;

                // Set assertions
                (facultyhomepages[0].user._id).should.equal(userId);
                (facultyhomepages[0].name).should.match('Facultyhomepage name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Facultyhomepage if not logged in', function (done) {
    agent.post('/api/facultyhomepages')
      .send(facultyhomepage)
      .expect(403)
      .end(function (facultyhomepageSaveErr, facultyhomepageSaveRes) {
        // Call the assertion callback
        done(facultyhomepageSaveErr);
      });
  });

  it('should not be able to save an Facultyhomepage if no name is provided', function (done) {
    // Invalidate name field
    facultyhomepage.name = '';

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

        // Save a new Facultyhomepage
        agent.post('/api/facultyhomepages')
          .send(facultyhomepage)
          .expect(400)
          .end(function (facultyhomepageSaveErr, facultyhomepageSaveRes) {
            // Set message assertion
            (facultyhomepageSaveRes.body.message).should.match('Please fill Facultyhomepage name');

            // Handle Facultyhomepage save error
            done(facultyhomepageSaveErr);
          });
      });
  });

  it('should be able to update an Facultyhomepage if signed in', function (done) {
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

        // Save a new Facultyhomepage
        agent.post('/api/facultyhomepages')
          .send(facultyhomepage)
          .expect(200)
          .end(function (facultyhomepageSaveErr, facultyhomepageSaveRes) {
            // Handle Facultyhomepage save error
            if (facultyhomepageSaveErr) {
              return done(facultyhomepageSaveErr);
            }

            // Update Facultyhomepage name
            facultyhomepage.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Facultyhomepage
            agent.put('/api/facultyhomepages/' + facultyhomepageSaveRes.body._id)
              .send(facultyhomepage)
              .expect(200)
              .end(function (facultyhomepageUpdateErr, facultyhomepageUpdateRes) {
                // Handle Facultyhomepage update error
                if (facultyhomepageUpdateErr) {
                  return done(facultyhomepageUpdateErr);
                }

                // Set assertions
                (facultyhomepageUpdateRes.body._id).should.equal(facultyhomepageSaveRes.body._id);
                (facultyhomepageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Facultyhomepages if not signed in', function (done) {
    // Create new Facultyhomepage model instance
    var facultyhomepageObj = new Facultyhomepage(facultyhomepage);

    // Save the facultyhomepage
    facultyhomepageObj.save(function () {
      // Request Facultyhomepages
      request(app).get('/api/facultyhomepages')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Facultyhomepage if not signed in', function (done) {
    // Create new Facultyhomepage model instance
    var facultyhomepageObj = new Facultyhomepage(facultyhomepage);

    // Save the Facultyhomepage
    facultyhomepageObj.save(function () {
      request(app).get('/api/facultyhomepages/' + facultyhomepageObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', facultyhomepage.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Facultyhomepage with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/facultyhomepages/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Facultyhomepage is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Facultyhomepage which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Facultyhomepage
    request(app).get('/api/facultyhomepages/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Facultyhomepage with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Facultyhomepage if signed in', function (done) {
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

        // Save a new Facultyhomepage
        agent.post('/api/facultyhomepages')
          .send(facultyhomepage)
          .expect(200)
          .end(function (facultyhomepageSaveErr, facultyhomepageSaveRes) {
            // Handle Facultyhomepage save error
            if (facultyhomepageSaveErr) {
              return done(facultyhomepageSaveErr);
            }

            // Delete an existing Facultyhomepage
            agent.delete('/api/facultyhomepages/' + facultyhomepageSaveRes.body._id)
              .send(facultyhomepage)
              .expect(200)
              .end(function (facultyhomepageDeleteErr, facultyhomepageDeleteRes) {
                // Handle facultyhomepage error error
                if (facultyhomepageDeleteErr) {
                  return done(facultyhomepageDeleteErr);
                }

                // Set assertions
                (facultyhomepageDeleteRes.body._id).should.equal(facultyhomepageSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Facultyhomepage if not signed in', function (done) {
    // Set Facultyhomepage user
    facultyhomepage.user = user;

    // Create new Facultyhomepage model instance
    var facultyhomepageObj = new Facultyhomepage(facultyhomepage);

    // Save the Facultyhomepage
    facultyhomepageObj.save(function () {
      // Try deleting Facultyhomepage
      request(app).delete('/api/facultyhomepages/' + facultyhomepageObj._id)
        .expect(403)
        .end(function (facultyhomepageDeleteErr, facultyhomepageDeleteRes) {
          // Set message assertion
          (facultyhomepageDeleteRes.body.message).should.match('User is not authorized');

          // Handle Facultyhomepage error error
          done(facultyhomepageDeleteErr);
        });

    });
  });

  it('should be able to get a single Facultyhomepage that has an orphaned user reference', function (done) {
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

          // Save a new Facultyhomepage
          agent.post('/api/facultyhomepages')
            .send(facultyhomepage)
            .expect(200)
            .end(function (facultyhomepageSaveErr, facultyhomepageSaveRes) {
              // Handle Facultyhomepage save error
              if (facultyhomepageSaveErr) {
                return done(facultyhomepageSaveErr);
              }

              // Set assertions on new Facultyhomepage
              (facultyhomepageSaveRes.body.name).should.equal(facultyhomepage.name);
              should.exist(facultyhomepageSaveRes.body.user);
              should.equal(facultyhomepageSaveRes.body.user._id, orphanId);

              // force the Facultyhomepage to have an orphaned user reference
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

                    // Get the Facultyhomepage
                    agent.get('/api/facultyhomepages/' + facultyhomepageSaveRes.body._id)
                      .expect(200)
                      .end(function (facultyhomepageInfoErr, facultyhomepageInfoRes) {
                        // Handle Facultyhomepage error
                        if (facultyhomepageInfoErr) {
                          return done(facultyhomepageInfoErr);
                        }

                        // Set assertions
                        (facultyhomepageInfoRes.body._id).should.equal(facultyhomepageSaveRes.body._id);
                        (facultyhomepageInfoRes.body.name).should.equal(facultyhomepage.name);
                        should.equal(facultyhomepageInfoRes.body.user, undefined);

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
      Facultyhomepage.remove().exec(done);
    });
  });
});
