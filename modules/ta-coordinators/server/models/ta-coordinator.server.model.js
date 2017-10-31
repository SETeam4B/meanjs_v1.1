'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ta coordinator Schema
 */
var TaCoordinatorSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Ta coordinator name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  preferenceCourse1: {
      type: Schema.ObjectId,
      ref: 'Course'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

var AdminSettings = new Schema({
  undergrad:{
    type : Number,
    default : 0
  },
  grad:{
    type : Number,
    default : 0
  },
  faculty:{
     type : Number,
    default : 0
  },
  gpa:{
     type : Number,
    default : 0
  },
  studentassignment:{
     type : Number,
    default : 0
  },
  facultyassignment:{
     type : Number,
    default : 0
  },
  updatesemester:{
      type : String
  }
});

mongoose.model('TaCoordinator', TaCoordinatorSchema);
mongoose.model('AdminSettings', AdminSettings);