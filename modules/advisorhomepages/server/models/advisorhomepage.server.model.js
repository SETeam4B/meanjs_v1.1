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
        required: false
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
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

StudentInfoSchema.pre('save', function () {
    var currentTime = new Date;
    if(!this.created_at) {
        this.created_at = currentTime;
    }
    next();
});


var StudentInfo = mongoose.model('Advisorhomepage', StudentInfoSchema);

module.exports = StudentInfo;
