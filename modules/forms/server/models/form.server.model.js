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
        defualt: '',
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
    plannedAbsences: {
        type: String,
        default: ''
    },

    //phd and undergrad TA
    isTeachingTA: {
        type: String,
        defualt: 'No'
    },


    //phd only

    offerType: {
        type: String,
        default: 'TA'
    },

    phdExamDate: {
        type: Date
    },
    phdExamGrade: {
        type: Number,
        default: 0
    },

    speakScore: {
        type: Number,
        default: 0
    },
    EAP5836: {
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

    //TODO: add fields on adviser: adviser only

    status: {
        type: String,
        default: 'Pending'
    },
    category: {
        type: String,
        default: 'N/A'
    },
    //TODO: check that this hour needs to be 10 and not 0 or the other way around
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
    //TODO: why not associate the user to the _id that is automatically generated and not the username
    //this username is used internally for associate form with user, it servers as a primary key for form document.
    username: {
        type: String,
        // unique: true,
        // default: ''
    }
});

FormSchema.pre('findOneAndUpdate', function (next, req, callback) {
    updateUser(next, this._update);
});
/**
 * done so that when the advisor adds without a user it adds a random user,
 * TODO: to be modified if this ever goes into production
 */
FormSchema.pre('save', function (next, req, callback) {
    var User = mongoose.model('User');
    var updateObject = this._doc;

    if (this._doc.username == undefined) {
        //TODO:check if username is on the db
        updateObject.username = "FakeUsername" + Math.random();
        var userData = {
            firstName: updateObject.firstName,
            lastName: updateObject.lastName,
            email: updateObject.email,
            username: updateObject.username,
            ufid: updateObject.ufid,
            provider: "local",
            availableHour: updateObject.hourTA
        };

        var fakeUser = new User(userData);
        fakeUser.save(function (err) {
            if (err) {
                console.log("was not able to save the fake user");
            }
            else {
                next();
            }
        });
    }
    else {
        updateUser(next, updateObject);
    }
});

/**
 * TODO: change the User.findOneAndUpdate to a post function not a pre
 * This function analyze if the hours are between 10-20
 * analyze if the hours available are more than the hours assigned
 * if these 2 conditions are met it keeps trying to add the function
 * @param next
 * @param updatingRequirement
 */
function updateUser(next, updatingRequirement) {
    var User = mongoose.model('User');
    updatingRequirement.username = updatingRequirement.username.toLowerCase();

    if (isWithinAvailableHours(updatingRequirement.hourTA)) {
        isHourGreaterThanAssignedHour(User, updatingRequirement.username, updatingRequirement.taHours)
            .then(function () {
                User.findOneAndUpdate({username: updatingRequirement.username}, {
                    availableHour: updatingRequirement.hourTA,
                    ufid: updatingRequirement.ufid
                }, function (err, data) {
                    if (err) {
                        next(err);
                        console.log("was not able to update the ufid and hours availabe on the User table");
                    } else {
                        next();
                    }
                });
            })
            .catch(function (err) {
                next(err);
            })
    } else {
        var myError = new Error("not within acceptable hours");
        next(myError);
    }


}

function isWithinAvailableHours(hour) {
    return hour <= 20 && hour >= 10;
}

/**
 * check if that the assigned hours are less or equal than the available hours
 * if availabe hours are less than assigned hours it will return an error
 * @param User
 * @param username
 * @param availableHour
 * @returns {*}
 */
function isHourGreaterThanAssignedHour(User, username, availableHour) {
    return new Promise(function (resolve, reject) {
        User.findOne({username: username}, function (err, data) {
            if (err) {
                return reject(err);
            }
            if (data.assignedHour > availableHour) {
                var myError = new Error("the student has more hours than it needs");
                return reject(myError);
            }
            return resolve();
        })
    })
}


mongoose.model('Form', FormSchema);
