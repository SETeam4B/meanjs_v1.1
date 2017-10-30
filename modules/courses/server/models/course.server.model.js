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
    courseId: {
        type: String,
        default: ''
    },
    courseSection: {
        type: String,
        default: ''
    },
    courseTitle: {
        type: String,
        default: ''
    },
    instructor: {
        type: String,
        default: ''
    },
    enrollmentAddDrop: {
        type: Number,
        default: 0
    },
    enrollmentSemester: {
        type: Number,
        default: 0
    },
    numberOfSection: {
        type: Number,
        default: 1
    },
    taHours: {
        type: Number,
        default: 0
    }


});

mongoose.model('Course', CourseSchema);
