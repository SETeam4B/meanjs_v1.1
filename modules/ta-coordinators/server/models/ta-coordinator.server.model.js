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

mongoose.model('TaCoordinator', TaCoordinatorSchema);
