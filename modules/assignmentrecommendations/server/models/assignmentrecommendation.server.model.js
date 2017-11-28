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
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: "user is required"
    },
    form: {
        type: String,
        required: "form is required"
    },
    course: {
        type: String,
        required: "course is required"
    }
});


//TODO: test this function later
/**
 * If the user is saved and assigned at the same time,
 * It will detect it and automatically update the user table
 */
Assignmentrecommendation.pre('save', function (next, req, callback) {
    var assigned = this._doc.assigned;
    var user = this._doc.user;

    if (assigned){
        addHours(next, user);
    }
});


/**
 * Before an update,
 * It checks if the hours are assigned
 * If the value assigned is "false" and it used to be true, it decreases 10 hours from the user table
 * If the value assigned is "true", it adds 10 hours to the user table
 */
Assignmentrecommendation.pre('findOneAndUpdate', function (next, req, callback) {
    var Ass = mongoose.model('Assignmentrecommendation');
    if (isAssigned(this._update.assigned)) {
        var condition = this._conditions.user;
        console.log("condition"+condition);
        if (this._update.assigned) {
            findUserToAddHours(next, condition, Ass);
        }
        else {
            findUserToDeleteHours(next, condition, Ass);
        }
    }
    next();
});

/**
 * finds the user to add the hours from,
 * calls the function to add the hours
 * @param next
 * @param condition
 * @param Ass
 */
function findUserToAddHours(next, condition, Ass) {
    console.log("condition：" +condition);
    Ass.findOne({_id: condition}, function (err, data) {
        if (err) {
            next(new Error("bad call"));
        }
        addHours(next, condition);
    });
}

/**
 * finds the user to delete the hours from,
 * calls the function to delete the hours
 * @param next
 * @param condition
 * @param Ass
 */
function findUserToDeleteHours(next, condition, Ass) {
    Ass.findOne({_id: condition}, function (err, data) {
        if (err) {
            next(new Error("bad call"));
        }
        if (data.assigned) {
            removeHours(next, data.user);
        } else {
            next();
        }
    });
}

/**
 * assuming that the hours assigned to a TA are a constant 10 hours
 * if this is to change this variable needs to change
 * @type {number}
 */
const constantAssignedHour = 10;

/**
 *
 * With the user id it finds his assigned hours
 * Removes 10 assigned hours from the user
 * @param next
 * @param userId
 */
function removeHours(next, userId) {
    var User = mongoose.model('User');

    User.findOne({_id: userId}, function (err, data) {
        if (err) {
            next(new Error("bad call"));
        }

        var futureAssignedHours = data.assignedHour - constantAssignedHour;
        if (futureAssignedHours < 0) {
            futureAssignedHours = 0;
        }
        assignHours(next, futureAssignedHours, userId, User);
    });
}

/**
 * With the user id it finds his assigned hours
 * Adds 10 assigned hours from the user
 * @param next
 * @param userId
 */
function addHours(next, userId) {
    var User = mongoose.model('User');
    console.log("user id " + userId);
    User.findOne({_id: userId}, function (err, data) {
        if (err) {
            next(new Error("bad call"));
        }
console.log("data"+data);
        var futureAssignedHours = data.assignedHour + constantAssignedHour;
        if (futureAssignedHours > data.availableHour) {
            return next(new Error("assigned hours are greater than available hours"));
        }
        assignHours(next, futureAssignedHours, userId, User);
    })
}

/**
 * After calculating how many hours have changed this function is called to update the
 * User table with the new assigned hours
 * @param next
 * @param futureHours
 * @param userId
 * @param User
 */
function assignHours(next, futureHours, userId, User) {
    User.findOneAndUpdate({_id: userId}, {assignedHour: futureHours}, function (err, data) {
        if (err) {
            next(new Error("bad call"));
        }
        next();
    });
}

function isAssigned(assigned) {
    return assigned != undefined;
}

mongoose.model('Assignmentrecommendation', Assignmentrecommendation);
