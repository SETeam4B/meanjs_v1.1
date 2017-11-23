'use strict';

var should = require('should'),
  path = require('path'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  express = require(path.resolve('./config/lib/express'));

  
var app, agent, guestcredentials, usercredentials, advisorcredentials,tacoordinatorcredentials,
  facultycredentials, guest, user, advisor, faculty, tacoordinator,_guest, _user,_advisor,_faculty,_tacoordinator;

describe('Authorized Routing Tests:', function(){

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    guestcredentials = {
      username: 'username041332',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    usercredentials = {
      username: 'username0412',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    advisorcredentials = {
      username: 'username1123',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    tacoordinatorcredentials = {
      username: 'username61232',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    facultycredentials = {
      username: 'username312341',
      password: 'M3@n.jsI$Aw3$0m3'
    };



    // Create test users
    _user = {
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test82@test.com',
      username: usercredentials.username,
      password: usercredentials.password,
      provider: 'local',
      roles:['user']
    };

    _advisor = {
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test231@test.com',
      username: advisorcredentials.username,
      password: advisorcredentials.password,
      provider: 'local',
      roles:['advisor']
    };

    _tacoordinator = {
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test3412@test.com',
      username: tacoordinatorcredentials.username,
      password: tacoordinatorcredentials.password,
      provider: 'local',
      roles:['tacoordinator']
    };

    _faculty = {
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test461235@test.com',
      username: facultycredentials.username,
      password: facultycredentials.password,
      provider: 'local',
      roles:['faculty']
    };


    _guest = {
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test463331235@test.com',
      username: guestcredentials.username,
      password: guestcredentials.password,
      provider: 'local',
      roles:['guest']
    };

    guest = new User(_guest);
    user = new User(_user);
    advisor = new User(_advisor);
    tacoordinator = new User(_tacoordinator);
    faculty = new User(_faculty);

    user.save(function (err) {
      should.not.exist(err);
    });

    advisor.save(function (err) {
      should.not.exist(err);
    });

    tacoordinator.save(function (err) {
      should.not.exist(err);
    });

    faculty.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('should not be able to access tacoordinator API if not tacoordinator', function(done){
    agent.post('/api/auth/signin')
      .send(usercredentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        agent.post('/api/ta-coordinators')
          .expect(403)
          .end(function (usersGetErr, usersGetRes) {
            if (usersGetErr) {
              return done(usersGetErr);
            }

            return done();
          });
      });
  });

  describe('Advisor API Access: ', function(){

      describe("As a user that hasn't logged in: ", function(){
        describe("GET Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(guestcredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.get('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });
          it('/api/advisorhomepages/consideringStudents', function(done){
            agent.post('/api/auth/signin')
              .send(guestcredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.get('/api/advisorhomepages/consideringStudents')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });     
        });

        describe("POST Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(guestcredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.post('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });
        });

        describe("PUT Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(guestcredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.put('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });  
        });
    });

    describe("As a student: ", function(){
        describe("GET Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(usercredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.get('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });
          it('/api/advisorhomepages/consideringStudents', function(done){
            agent.post('/api/auth/signin')
              .send(usercredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.get('/api/advisorhomepages/consideringStudents')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });     
        });

        describe("POST Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(usercredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.post('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });
        });

        describe("PUT Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(usercredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.put('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });  
        });
    });

    describe("As a faculty: ", function(){
        describe("GET Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(facultycredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.get('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });
          it('/api/advisorhomepages/consideringStudents', function(done){
            agent.post('/api/auth/signin')
              .send(facultycredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.get('/api/advisorhomepages/consideringStudents')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });     
        });

        describe("POST Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(facultycredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.post('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });
        });

        describe("PUT Requests: ", function(){
          it('/api/advisorhomepages', function(done){
            agent.post('/api/auth/signin')
              .send(facultycredentials)
              .expect(200)
              .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) {
                  return done(signinErr);
                }
                agent.put('/api/advisorhomepages')
                  .expect(403)
                  .end(function (usersGetErr, usersGetRes) {
                    if (usersGetErr) {
                      return done(usersGetErr);
                    }

                    return done();
                  });
              });
          });  
        });
    });

  });

  it('should not be able to access faculty pages if not faculty', function(done){
    return done(); //Write me
  });

  it('should not be able to access forms pages if unauthorized', function(done){
    agent.get('/api/forms')
      .expect(403)
      .end(function(formsGetErr, formsGetRes){
        if(formsGetErr){
          return done(formsGetErr);
        }

        return done();
      });
  });
  
  afterEach(function (done) {
    //(Sweating)
    User.remove().exec(done);
  });
  
});
