'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Form = mongoose.model('Form'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  form;

/**
 * Form routes tests
 */
describe('Form CRUD tests', function () {

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

    // Save a user to the test db and create new Form
    user.save(function () {
      form = {
        name: 'Form name'
      };

      done();
    });
  });

  it('should be able to save a Form if logged in', function (done) {
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

        // Save a new Form
        agent.post('/api/forms')
          .send(form)
          .expect(200)
          .end(function (formSaveErr, formSaveRes) {
            // Handle Form save error
            if (formSaveErr) {
              return done(formSaveErr);
            }

            // Get a list of Forms
            agent.get('/api/forms')
              .end(function (formsGetErr, formsGetRes) {
                // Handle Forms save error
                if (formsGetErr) {
                  return done(formsGetErr);
                }

                // Get Forms list
                var forms = formsGetRes.body;

                // Set assertions
                (forms[0].user._id).should.equal(userId);
                (forms[0].name).should.match('Form name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Form if not logged in', function (done) {
    agent.post('/api/forms')
      .send(form)
      .expect(403)
      .end(function (formSaveErr, formSaveRes) {
        // Call the assertion callback
        done(formSaveErr);
      });
  });

  it('should not be able to save an Form if no name is provided', function (done) {
    // Invalidate name field
    form.name = '';

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

        // Save a new Form
        agent.post('/api/forms')
          .send(form)
          .expect(400)
          .end(function (formSaveErr, formSaveRes) {
            // Set message assertion
            (formSaveRes.body.message).should.match('Please fill Form name');

            // Handle Form save error
            done(formSaveErr);
          });
      });
  });

  it('should be able to update an Form if signed in', function (done) {
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

        // Save a new Form
        agent.post('/api/forms')
          .send(form)
          .expect(200)
          .end(function (formSaveErr, formSaveRes) {
            // Handle Form save error
            if (formSaveErr) {
              return done(formSaveErr);
            }

            // Update Form name
            form.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Form
            agent.put('/api/forms/' + formSaveRes.body._id)
              .send(form)
              .expect(200)
              .end(function (formUpdateErr, formUpdateRes) {
                // Handle Form update error
                if (formUpdateErr) {
                  return done(formUpdateErr);
                }

                // Set assertions
                (formUpdateRes.body._id).should.equal(formSaveRes.body._id);
                (formUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Forms if not signed in', function (done) {
    // Create new Form model instance
    var formObj = new Form(form);

    // Save the form
    formObj.save(function () {
      // Request Forms
      request(app).get('/api/forms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Form if not signed in', function (done) {
    // Create new Form model instance
    var formObj = new Form(form);

    // Save the Form
    formObj.save(function () {
      request(app).get('/api/forms/' + formObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', form.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Form with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/forms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Form is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Form which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Form
    request(app).get('/api/forms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Form with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Form if signed in', function (done) {
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

        // Save a new Form
        agent.post('/api/forms')
          .send(form)
          .expect(200)
          .end(function (formSaveErr, formSaveRes) {
            // Handle Form save error
            if (formSaveErr) {
              return done(formSaveErr);
            }

            // Delete an existing Form
            agent.delete('/api/forms/' + formSaveRes.body._id)
              .send(form)
              .expect(200)
              .end(function (formDeleteErr, formDeleteRes) {
                // Handle form error error
                if (formDeleteErr) {
                  return done(formDeleteErr);
                }

                // Set assertions
                (formDeleteRes.body._id).should.equal(formSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Form if not signed in', function (done) {
    // Set Form user
    form.user = user;

    // Create new Form model instance
    var formObj = new Form(form);

    // Save the Form
    formObj.save(function () {
      // Try deleting Form
      request(app).delete('/api/forms/' + formObj._id)
        .expect(403)
        .end(function (formDeleteErr, formDeleteRes) {
          // Set message assertion
          (formDeleteRes.body.message).should.match('User is not authorized');

          // Handle Form error error
          done(formDeleteErr);
        });

    });
  });

  it('should be able to get a single Form that has an orphaned user reference', function (done) {
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

          // Save a new Form
          agent.post('/api/forms')
            .send(form)
            .expect(200)
            .end(function (formSaveErr, formSaveRes) {
              // Handle Form save error
              if (formSaveErr) {
                return done(formSaveErr);
              }

              // Set assertions on new Form
              (formSaveRes.body.name).should.equal(form.name);
              should.exist(formSaveRes.body.user);
              should.equal(formSaveRes.body.user._id, orphanId);

              // force the Form to have an orphaned user reference
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

                    // Get the Form
                    agent.get('/api/forms/' + formSaveRes.body._id)
                      .expect(200)
                      .end(function (formInfoErr, formInfoRes) {
                        // Handle Form error
                        if (formInfoErr) {
                          return done(formInfoErr);
                        }

                        // Set assertions
                        (formInfoRes.body._id).should.equal(formSaveRes.body._id);
                        (formInfoRes.body.name).should.equal(form.name);
                        should.equal(formInfoRes.body.user, undefined);

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
      Form.remove().exec(done);
    });
  });
});
