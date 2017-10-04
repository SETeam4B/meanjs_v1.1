'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Advisorhomepage Schema
 */
var AdvisorhomepageSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Advisorhomepage name',
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

mongoose.model('Advisorhomepage', AdvisorhomepageSchema);
