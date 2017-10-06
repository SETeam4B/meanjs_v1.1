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
    username: {
        type: String,
        unique: true,
        default: ''
    },
    name: {
        type: String,
        default: '',
        required: 'Please fill name',
        trim: true
    },
    ufid: {
        type: Number,
        default: 0,
        required: 'Please fill your uf_id'
    },
    gpa: {
        type: Number,
        default: 4.0
    },
    nativelanguage: {
        type: String,
        default: 'English'
    },
    adviser: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'Pending'
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


mongoose.model('Form', FormSchema);
