'use strict';

/**
 * Module dependencies
 */
var assignmentrecommendationsPolicy = require('../policies/assignmentrecommendations.server.policy'),
  assignmentrecommendations = require('../controllers/assignmentrecommendations.server.controller');

module.exports = function(app) {
  // Assignmentrecommendations Routes
  app.route('/api/assignmentrecommendations').all(assignmentrecommendationsPolicy.isAllowed)
    .get(assignmentrecommendations.list)
    .post(assignmentrecommendations.create);

  app.route('/api/assignmentrecommendations/:assignmentrecommendationId').all(assignmentrecommendationsPolicy.isAllowed)
    .get(assignmentrecommendations.read)
    .put(assignmentrecommendations.update)
    .delete(assignmentrecommendations.delete);

  // Finish by binding the Assignmentrecommendation middleware
  app.param('assignmentrecommendationId', assignmentrecommendations.assignmentrecommendationByID);
};