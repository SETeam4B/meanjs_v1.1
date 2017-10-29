'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Advisorhomepage Schema
 */
var StudentInfoSchema = new Schema({
    studentId: {
        required: false,
        type: String
    },
    name: {
        type: String,
        default: '',
        required: 'Student Name',
        trim: true
    },
    type:{
        type: String,
        required:true
    },
    created: {
        type: Date,
        default: Date.now
    },
    gpa:{
        type: String,
        required:false
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Advisorhomepage', StudentInfoSchema); //Hack to make tests work?? Fix me

var StudentInfo = mongoose.model('StudentInfoSchema', StudentInfoSchema);

module.exports = StudentInfo;
