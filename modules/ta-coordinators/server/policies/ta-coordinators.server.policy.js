'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Ta coordinators Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['tacoordinator'],
    allows: [{
      resources: '/api/ta-coordinators',
      permissions: '*'
    }, {
      resources: '/api/ta-coordinators/:taCoordinatorId',
      permissions: '*'
    }, {
      resources: '/api/ta-coordinators/status',
      permissions: '*'
    }]
  }, {
    roles: ['admin'],
    allows: [{
      resources: '/api/ta-coordinators',
      permissions: '*'
    }, {
      resources: '/api/ta-coordinators/:taCoordinatorId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/ta-coordinators',
      permissions: ['get', 'post']
    }, {
      resources: '/api/ta-coordinators/:taCoordinatorId',
      permissions: ['get']
    }]
  }, {
    roles: ['faculty'],
    allows: [{
      resources: '/api/ta-coordinators',
      permissions: '*'
    }, {
      resources: '/api/ta-coordinators/:taCoordinatorId',
      permissions: '*'
    }, {
      resources: '/api/ta-coordinators/status',
      permissions: '*'
    }]
  }, {
    roles: ['advisor'],
    allows: [{
      resources: '/api/ta-coordinators',
      permissions: '*'
    }, {
      resources: '/api/ta-coordinators/:taCoordinatorId',
      permissions: '*'
    }, {
      resources: '/api/ta-coordinators/status',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Ta coordinators Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  //$scope.status.undergrad
  //$scope.status.grad
  //$scope.status.phd
  //Need to ignore if $scope.status is undefined

  // If an Ta coordinator is being processed and the current user created it then allow any manipulation
  if (req.taCoordinator && req.user && req.taCoordinator.user && req.taCoordinator.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
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
};
