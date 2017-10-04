// Advisorhomepages service used to communicate Advisorhomepages REST endpoints
(function () {
  'use strict';

  angular
    .module('advisorhomepages')
    .factory('AdvisorhomepagesService', AdvisorhomepagesService);

  AdvisorhomepagesService.$inject = ['$resource'];

  function AdvisorhomepagesService($resource) {
    return $resource('api/advisorhomepages/:advisorhomepageId', {
      advisorhomepageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
