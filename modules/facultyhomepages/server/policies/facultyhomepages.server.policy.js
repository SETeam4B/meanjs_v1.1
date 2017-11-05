'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');
var status = require('../../../ta-coordinators/server/controllers/ta-coordinators.server.controller');
var mongoose = require('mongoose');
var AdminSettings = mongoose.model('AdminSettings');
// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Facultyhomepages Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['faculty'],
    allows: [{
      resources: '/api/facultyhomepages',
      permissions: '*'
    }, {
      resources: '/api/facultyhomepages/:facultyhomepageId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/facultyhomepages',
      permissions: ['get', 'post']
    }, {
      resources: '/api/facultyhomepages/:facultyhomepageId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/facultyhomepages',
      permissions: ['get']
    }, {
      resources: '/api/facultyhomepages/:facultyhomepageId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Facultyhomepages Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Facultyhomepage is being processed and the current user created it then allow any manipulation
  if (req.facultyhomepage && req.user && req.facultyhomepage.user && req.facultyhomepage.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  /*
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
  */
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        //Check if faculty page is available.
        AdminSettings.findById("59fe44ed6e413a94231257db").exec(function (err, status) {
            if (err) {
                return res.status(400).send('Error retrieving status from database.');
            } else {
                if(status.faculty){
                  return next(); //Faculty page is open.
                }else{
                  return res.status(403).json({message:'Faculty page is closed.'});
                }
            }
        });

      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });

};
