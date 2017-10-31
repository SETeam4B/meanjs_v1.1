'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Facultyhomepage = mongoose.model('Facultyhomepage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Facultyhomepage
 */
exports.create = function(req, res) {
  var facultyhomepage = new Facultyhomepage(req.body);
  facultyhomepage.user = req.user;

  facultyhomepage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facultyhomepage);
    }
  });
};

/**
 * Show the current Facultyhomepage
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var facultyhomepage = req.facultyhomepage ? req.facultyhomepage.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  facultyhomepage.isCurrentUserOwner = req.user && facultyhomepage.user && facultyhomepage.user._id.toString() === req.user._id.toString();

  res.jsonp(facultyhomepage);
};

/**
 * Update a Facultyhomepage
 */
exports.update = function(req, res) {
  var facultyhomepage = req.facultyhomepage;

  facultyhomepage = _.extend(facultyhomepage, req.body);

  facultyhomepage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facultyhomepage);
    }
  });
};

/**
 * Delete an Facultyhomepage
 */
exports.delete = function(req, res) {
  var facultyhomepage = req.facultyhomepage;

  facultyhomepage.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facultyhomepage);
    }
  });
};

/**
 * List of Facultyhomepages
 */
exports.list = function(req, res) {
  Facultyhomepage.find().sort('-created').populate('user', 'displayName').exec(function(err, facultyhomepages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(facultyhomepages);
    }
  });
};

/**
 * Facultyhomepage middleware
 */
exports.facultyhomepageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Facultyhomepage is invalid'
    });
  }

  Facultyhomepage.findById(id).populate('user', 'displayName').exec(function (err, facultyhomepage) {
    if (err) {
      return next(err);
    } else if (!facultyhomepage) {
      return res.status(404).send({
        message: 'No Facultyhomepage with that identifier has been found'
      });
    }
    req.facultyhomepage = facultyhomepage;
    next();
  });
};
