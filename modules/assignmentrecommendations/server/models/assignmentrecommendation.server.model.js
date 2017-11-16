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
    assigned: {
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
    course: {
        type: Schema.ObjectId,
        ref: 'Course'
    }
});

Assignmentrecommendation.pre('findOneAndUpdate', function (next, req, callback) {
    var Ass = mongoose.model('Assignmentrecommendation');
    if (isAssigned(this._update.assigned)) {
        var condition = this._conditions._id;
        // var whatever = this.getQuery();
        Ass.findOne({_id: condition}, function (err, data) {
            if (err) {
                next(new Error("bad call"));
            }
            findHours(next, data.user)
        })
    }
    // Form.findOne({_id: this._update._id})
});

function findHours(next, userId) {
    var User = mongoose.model('User');

    User.findOne({_id: userId}, function (err, data) {
        if (err) {
            next(new Error("bad call"));
        }
        console.log("available hours " + data.availableHour);
        console.log("assigned hours " + data.assignedHour);
        next();
    })
}

//TODO: assign course hours either to courses, or to the TA
function findCourseHours() {

}


function isAssigned(assigned) {
    return assigned != undefined;
}

mongoose.model('Assignmentrecommendation', Assignmentrecommendation);
