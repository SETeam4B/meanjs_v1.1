'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  //User = mongoose.model('User'),
  config = require('../../../../config/config'),
  mg = require('../../../../config/lib/mongoose');

mg.loadModels();
var db, User;
//var User = mongoose.model('User');
/**
 * Unit tests
 */
describe('User Authentication Unit Tests:', function () {

  before(function (done) {
    db = mongoose.createConnection('mongodb://cen_4b_username:cen_4b_password@ds161584.mlab.com:61584/cen_4b');
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function(){
      console.log('Connected to DB.');
      User = db.model('User');
      done();
    });
  });

  describe('Admin Count Tests', function(){

      it('should have at least one TA Coordinator', function(done){
        User.find({roles:['tacoordinator']}, function(err, users){
          var exists = users.length >= 1;
          exists.should.equal(true);
          done();
        });
      });

      it('should have at least one Advisor', function(done){
        User.find({roles:['advisor']}, function(err, users){
          var exists = users.length >= 1;
          exists.should.equal(true);
          done();
        });
      });

      it('should have at least one Faculty', function(done){
        User.find({roles:['faculty']}, function(err, users){
          var exists = users.length >= 1;
          exists.should.equal(true);
          done();
        });
      });

  });


  after(function (done) {
    done();
    next(); //????
    //User.remove().exec(done);
  });
});
