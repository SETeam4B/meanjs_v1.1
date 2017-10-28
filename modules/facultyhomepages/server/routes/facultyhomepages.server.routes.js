'use strict';

/**
 * Module dependencies
 */
var facultyhomepagesPolicy = require('../policies/facultyhomepages.server.policy'),
  facultyhomepages = require('../controllers/facultyhomepages.server.controller');

module.exports = function(app) {
  // Facultyhomepages Routes
  app.route('/api/facultyhomepages').all(facultyhomepagesPolicy.isAllowed)
    .get(facultyhomepages.list)
    .post(facultyhomepages.create);

  app.route('/api/facultyhomepages/:facultyhomepageId').all(facultyhomepagesPolicy.isAllowed)
    .get(facultyhomepages.read)
    .put(facultyhomepages.update)
    .delete(facultyhomepages.delete);

  // Finish by binding the Facultyhomepage middleware
  app.param('facultyhomepageId', facultyhomepages.facultyhomepageByID);
};
