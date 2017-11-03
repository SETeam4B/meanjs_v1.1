'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Form Schema
 */

var FormSchema = new Schema({
    ufid: {
        type: Number,
        default: 0,
        required: 'Please fill in your UFID number without dash.',
        unique: true
    },

    email: {
        type: String,
        defualt:'',
        required: 'Please fill in your email address.'
    },

    firstName: {
        type: String,
        default: '',
        required: 'Please fill in your first name.',
        trim: true
    },
    middleName: {
        type: String,
        default: '',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        required: 'Please fill in your last name.',
        trim: true
    },
    street: {
        type: String,
        default: '',
        required: 'Please fill in your address.',
        trim: true
    },
    city: {
        type: String,
        default: '',
        required: 'Please fill in your city.',
        trim: true
    },
    state: {
        type: String,
        default: '',
        required: 'Please fill in your state or province.',
        trim: true
    },
    zipcode: {
        type: Number,
        default: 0,
        required: 'Please fill in your zipcode.'
    },

    phone: {
        type: Number,
        default: 0,
        required: 'Please fill in your phone number.'
    },

    semesterAdmitted: {
        type: String,
        default: '',
        required: 'Please choose your admitted semeter.'
    },
    originCountry: {
        type: String,
        default: 'USA',
        required: 'Please choose your origin country.'
    },
    preferenceCourse1: {
        type: Schema.ObjectId,
        ref: 'Course',
        requried: "Please choose your primary course preference."
    },
    preferenceCourse2: {
        type: Schema.ObjectId,
        ref: 'Course',
        requried: "Please choose your secondary course preference."
    },
    preferenceCourse3: {
        type: Schema.ObjectId,
        ref: 'Course',
        requried: "Please choose your tertiary course preference."
    },

    interestExperience: {
        type: String,
        default: ''
    },
    gpa: {
        type: Number,
        default: 4.0
    },
    previousCourseTaken: {
        type: String,
        default: ''
    },
    plannedAbsences : {
        type: String,
        default: ''
    },

    //phd and undergrad TA
    isTeachingTA: {
        type: String,
        defualt: 'No'
    },


    //phd only

    offerType:{
        type: String,
        default: 'TA'
    },

    phdExamDate: {
        type:Date
    },
    phdExamGrade:{
        type:Number,
        default: 0
    },

    speakScore: {
        type: Number,
        default: 0
    },
    EAP5836 :{
        type: Number,
        default: 0
    },
    EAP5837: {
        type: Number,
        default: 0
    },

    adviser: {
        type: String,
        default: ''
    },
    researchArea: {
        type: String,
        default: ''
    },

    //adviser only

    status: {
        type: String,
        default: 'Pending'
    },
    category: {
        type: String,
        default: 'N/A'
    },
    hourTA: {
        type: Number,
        default: 10
    },

    //system used
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    //this username is used internally for associate form with user, it servers as a primary key for form document.
    username: {
        type: String,
        unique: true,
        default: ''
    }
});


mongoose.model('Form', FormSchema);
