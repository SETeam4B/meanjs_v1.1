'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Assignmentrecommendation Schema
 */
var TARecommendation = new Schema({
  assigned :{
    type: String,
      default: "No"
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  course :{
    type: Schema.ObjectId,
      ref:'Course'
  }
});

mongoose.model('TARecommendation', TARecommendation);
