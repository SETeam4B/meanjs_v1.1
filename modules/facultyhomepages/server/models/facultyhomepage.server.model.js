'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Facultyhomepage Schema
 */
var FacultyhomepageSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Facultyhomepage name',
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

mongoose.model('Facultyhomepage', FacultyhomepageSchema);
