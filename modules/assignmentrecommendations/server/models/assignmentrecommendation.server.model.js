'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Assignmentrecommendation Schema
 */
var AssignmentrecommendationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Assignmentrecommendation name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Assignmentrecommendation', AssignmentrecommendationSchema);
