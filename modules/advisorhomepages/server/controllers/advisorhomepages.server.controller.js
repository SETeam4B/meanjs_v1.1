'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Advisorhomepage = mongoose.model('Advisorhomepage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Advisorhomepage
 */
exports.create = function(req, res) {
  var advisorhomepage = new Advisorhomepage(req.body);
  advisorhomepage.user = req.user;

  advisorhomepage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advisorhomepage);
    }
  });
};

/**
 * Show the current Advisorhomepage
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var advisorhomepage = req.advisorhomepage ? req.advisorhomepage.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  advisorhomepage.isCurrentUserOwner = req.user && advisorhomepage.user && advisorhomepage.user._id.toString() === req.user._id.toString();

  res.jsonp(advisorhomepage);
};

/**
 * Update a Advisorhomepage
 */
exports.update = function(req, res) {
  var advisorhomepage = req.advisorhomepage;

  advisorhomepage = _.extend(advisorhomepage, req.body);

  advisorhomepage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advisorhomepage);
    }
  });
};

/**
 * Delete an Advisorhomepage
 */
exports.delete = function(req, res) {
  var advisorhomepage = req.advisorhomepage;

  advisorhomepage.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advisorhomepage);
    }
  });
};

/**
 * List of Advisorhomepages
 */
exports.list = function(req, res) {
  Advisorhomepage.find().sort('-created').populate('user', 'displayName').exec(function(err, advisorhomepages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advisorhomepages);
    }
  });
};

/**
 * Advisorhomepage middleware
 */
exports.advisorhomepageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Advisorhomepage is invalid'
    });
  }

  Advisorhomepage.findById(id).populate('user', 'displayName').exec(function (err, advisorhomepage) {
    if (err) {
      return next(err);
    } else if (!advisorhomepage) {
      return res.status(404).send({
        message: 'No Advisorhomepage with that identifier has been found'
      });
    }
    req.advisorhomepage = advisorhomepage;
    next();
  });
};
