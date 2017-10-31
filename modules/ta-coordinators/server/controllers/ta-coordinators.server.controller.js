'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TaCoordinator = mongoose.model('TaCoordinator'),
  AdminSettings = mongoose.model('AdminSettings'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ta coordinator
 */
exports.create = function(req, res) {
  var taCoordinator = new TaCoordinator(req.body);
  taCoordinator.user = req.user;

  taCoordinator.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(taCoordinator);
    }
  });
};

/**
 * Show the current Ta coordinator
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var taCoordinator = req.taCoordinator ? req.taCoordinator.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  taCoordinator.isCurrentUserOwner = req.user && taCoordinator.user && taCoordinator.user._id.toString() === req.user._id.toString();

  res.jsonp(taCoordinator);
};

/**
 * Update a Ta coordinator
 */
exports.update = function(req, res) {
  var taCoordinator = req.taCoordinator;

  taCoordinator = _.extend(taCoordinator, req.body);

  taCoordinator.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(taCoordinator);
    }
  });
};

/**
 * Delete an Ta coordinator
 */
exports.delete = function(req, res) {
  var taCoordinator = req.taCoordinator;

  taCoordinator.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(taCoordinator);
    }
  });
};

/**
 * List of Ta coordinators
 */
exports.list = function(req, res) {
  TaCoordinator.find().sort('-created').populate('user', 'displayName').exec(function(err, taCoordinators) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(taCoordinators);
    }
  });
};

/**
 * Ta coordinator middleware
 */
exports.taCoordinatorByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ta coordinator is invalid'
    });
  }

  TaCoordinator.findById(id).populate('user', 'displayName').exec(function (err, taCoordinator) {
    if (err) {
      return next(err);
    } else if (!taCoordinator) {
      return res.status(404).send({
        message: 'No Ta coordinator with that identifier has been found'
      });
    }
    req.taCoordinator = taCoordinator;
    next();
  });
};

exports.findAllConsideredApplicants = function(req, res){
    console.log("ping all considered applicants");
    StudentInfoSchema.find({},function (err, data) {
        if (err) {
            return res.status(400).send( {message: "error finding all students"});
        }
        console.log("get find all");
        return res.status(200).send({data:data});
    })
}
