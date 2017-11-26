'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Form = mongoose.model('Form'),
  Course = mongoose.model('Course');

/**
 * Globals
 */
var user, form,
  form_properties, course;

/**
 * Unit tests
 */
describe('Form Model Unit Tests:', function() {
  beforeEach(function(done) {
    course = new Course();

    form_properties = {
      ufid : 12,
      email : "test@runningtests.tk",
      firstName : "Test",
      lastName : "Run",
      street : "420 SW 69 CT",
      city : "Meme",
      state : "State",
      zipcode : "42000",
      phone: "18004204200",
      semesterAdmitted : "Spring 3000 BC",
      originCountry: "Chad",
      preferenceCourse1: course._id,
      preferenceCourse2 : course._id,
      preferenceCourse3 : course._id
    };

    done();
  });

  describe("Save functions", function(){
    it("Should not be able to save without ufid", function(done){
      delete form_properties.ufid;
      form = new Form(form_properties);

      form.save(function(err){
        should.exist(err);
        done();
      });
    });
    it("Should not be able to save without email", function(done){
      delete form_properties.email;

      form.save(function(err){
        should.exist(err);
        done();
      });
    });
    it("Should not be able to save without firstName", function(done){
      delete form_properties.firstName;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
    it("Should not be able to save without lastName", function(done){
      delete form_properties.lastName;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
    it("Should not be able to save without street", function(done){
      delete form_properties.street;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
    it("Should not be able to save without city", function(done){
      delete form_properties.city;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without state", function(done){
      delete form_properties.state;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without zipcode", function(done){
      delete form_properties.zipcode;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without phone", function(done){
      delete form_properties.phone;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without semesterAdmitted", function(done){
      delete form_properties.semesterAdmitted;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without originCountry", function(done){
      delete form_properties.originCountry;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without preferenceCourse1", function(done){
      delete form_properties.preferenceCourse1;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without preferenceCourse2", function(done){
      delete form_properties.preferenceCourse2;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });
      it("Should not be able to save without preferenceCourse3", function(done){
      delete form_properties.preferenceCourse3;
      form = new Form(form_properties);


      form.save(function(err){
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function(done) {
    Form.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
