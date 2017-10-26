'use strict';

var mongoose = require('mongoose'),
  chalk = require('chalk'),
  config = require('../config/config'),
  mg = require('../config/lib/mongoose');

//Load all the models being used throughout app.
mg.loadModels();

//Connect to db.
mg.connect(function (db) {
  var User = mongoose.model('User');

  //Create faculty user
  var faculty_user = new User({
      firstName: 'Faculty',
      lastName: 'User',
      displayName: 'Faculty User',
      email: 'faculty@test.com',
      username: 'faculty',
      password: 'faculty$4B$',
      provider: 'local',
      roles:['faculty']
    });

  //Save it
  faculty_user.save(function(err){
    if (err) {
      console.log("Error saving faculty user.");
      console.log(err);
    }
  });

  //Create TA Coordinator
  var tacoordinator_user = new User({
      firstName: 'TaCoordinator',
      lastName: 'User',
      displayName: 'TaCoordinator User',
      email: 'tacoordinator@test.com',
      username: 'tacoordinator',
      password: 'tacoordinator$4B$',
      provider: 'local',
      roles:['tacoordinator']
    });

  tacoordinator_user.save(function(err){
    if (err) {
      console.log("Error saving tacoordinator user.");
      console.log(err);
    }
  });

  //Create Advisor
  var advisor_user = new User({
      firstName: 'Advisor',
      lastName: 'User',
      displayName: 'Advisor User',
      email: 'advisor@test.com',
      username: 'advisor',
      password: 'advisor$4B$',
      provider: 'local',
      roles:['advisor']
    });

  advisor_user.save(function(err){
    if (err) {
      console.log("Error saving advisor user.");
      console.log(err);
    }
  });

});
