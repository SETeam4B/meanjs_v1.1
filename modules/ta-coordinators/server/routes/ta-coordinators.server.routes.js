'use strict';

/**
 * Module dependencies
 */
var taCoordinatorsPolicy = require('../policies/ta-coordinators.server.policy'),
  taCoordinators = require('../controllers/ta-coordinators.server.controller');

module.exports = function(app) {
  // Ta coordinators Routes
  app.route('/api/ta-coordinators').all(taCoordinatorsPolicy.isAllowed)
    .get(taCoordinators.list)
    .post(taCoordinators.create);

  app.route('/api/ta-coordinators/:taCoordinatorId').all(taCoordinatorsPolicy.isAllowed)
    .get(taCoordinators.read)
    .put(taCoordinators.update)
    .delete(taCoordinators.delete);

  // Finish by binding the Ta coordinator middleware
  app.param('taCoordinatorId', taCoordinators.taCoordinatorByID);
};
