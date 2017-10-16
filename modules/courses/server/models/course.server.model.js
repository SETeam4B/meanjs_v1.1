'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
  courseId:{
    type:String,
      default: ''
  },
    courseSection:{
    type: String ,
        default: ''
    },
  courseTitle: {
    type: String,
    default: ''
  },
  instructor:{
    type: String,
      default:''
  }

});

mongoose.model('Course', CourseSchema);
