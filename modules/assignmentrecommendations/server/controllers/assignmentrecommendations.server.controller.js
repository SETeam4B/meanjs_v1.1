'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    TARecommendation = mongoose.model('TARecommendation'),
    Form = mongoose.model('Form'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Assignmentrecommendation
 */
exports.create = function (req, res) {
    var assignmentrecommendation = new TARecommendation(req.body);
    assignmentrecommendation.user = req.user;

    assignmentrecommendation.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(assignmentrecommendation);
        }
    });
};

/**
 * Show the current Assignmentrecommendation
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var assignmentrecommendation = req.assignmentrecommendation ? req.assignmentrecommendation.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    assignmentrecommendation.isCurrentUserOwner = req.user && assignmentrecommendation.user && assignmentrecommendation.user._id.toString() === req.user._id.toString();

    res.jsonp(assignmentrecommendation);
};

/**
 * Update a Assignmentrecommendation
 */
exports.update = function (req, res) {
    var assignmentrecommendation = req.assignmentrecommendation;

    assignmentrecommendation = _.extend(assignmentrecommendation, req.body);

    assignmentrecommendation.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(assignmentrecommendation);
        }
    });
};

/**
 * Delete an Assignmentrecommendation
 */
exports.delete = function (req, res) {
    var assignmentrecommendation = req.assignmentrecommendation;

    assignmentrecommendation.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(assignmentrecommendation);
        }
    });
};

/**
 * List of Assignmentrecommendations
 */
exports.list = function (req, res) {
    Assignmentrecommendation.find().sort('-created').populate('user', 'displayName').exec(function (err, assignmentrecommendations) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(assignmentrecommendations);
        }
    });
};

/**
 * Assignmentrecommendation middleware
 */
exports.assignmentrecommendationByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Assignmentrecommendation is invalid'
        });
    }

    Assignmentrecommendation.findById(id).populate('user', 'displayName').exec(function (err, assignmentrecommendation) {
        if (err) {
            return next(err);
        } else if (!assignmentrecommendation) {
            return res.status(404).send({
                message: 'No Assignmentrecommendation with that identifier has been found'
            });
        }
        req.assignmentrecommendation = assignmentrecommendation;
        next();
    });
};

/**
 * fetches all information of the students who have been rejected
 * @param req
 * @param res
 * returns an object that contains a parameter called "data"
 * this "data" will contain an array of elements of students who have been rejected
 */
exports.getRejectedList = function (req, res) {
    Form.find({status:"Rejected"}, function (err, data) {
        if (err){
            return res.status(400).send({message:"could not find the rejected list"});
        }
        return res.status(200).send({data:data});
    })
};

/**
 * fetches all information of the students who have been rejected
 * @param req
 * @param res
 * returns an object that contains a parameter called "data"
 * this "data" will contain an object that has three fields TA, UTA, and Graders
 * each field contains an array of all the students that are considered for them
 */
exports.getAcceptedList = function (req, res) {
    Form.find({status:"Accepted"}, function (err, data) {
        if (err){
            return res.status(400).send({message:"could not find the accepted list"});
        }
        var acceptedCategory ={
            TA: [],
            UTA: [],
            Grader: []
        }
        data.forEach(function (element) {
           acceptedCategory[element.category].push(element);
        });

        return res.status(200).send({data:acceptedCategory});
    })
};
