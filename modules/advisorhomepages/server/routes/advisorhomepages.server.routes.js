'use strict';

/**
 * Module dependencies
 */
var advisorhomepagesPolicy = require('../policies/advisorhomepages.server.policy'),
  advisorhomepages = require('../controllers/advisorhomepages.server.controller');

module.exports = function(app) {
  // Advisorhomepages Routes
  app.route('/api/advisorhomepages').all(advisorhomepagesPolicy.isAllowed)
    .get(advisorhomepages.list)
    .post(advisorhomepages.create);

  app.route('/api/advisorhomepages/:advisorhomepageId').all(advisorhomepagesPolicy.isAllowed)
    .get(advisorhomepages.read)
    .put(advisorhomepages.update)
    .delete(advisorhomepages.delete);

  // Finish by binding the Advisorhomepage middleware
  app.param('advisorhomepageId', advisorhomepages.advisorhomepageByID);
};
