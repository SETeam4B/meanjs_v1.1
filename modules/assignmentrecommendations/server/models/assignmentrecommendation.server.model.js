'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Assignmentrecommendation Schema
 */
var Assignmentrecommendation = new Schema({
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
    form: {
    type: Schema.ObjectId,
        ref: 'Form'
    },
  course :{
    type: Schema.ObjectId,
      ref:'Course'
  }
});

mongoose.model('Assignmentrecommendation', Assignmentrecommendation);
