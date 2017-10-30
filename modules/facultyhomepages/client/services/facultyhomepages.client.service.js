// Facultyhomepages service used to communicate Facultyhomepages REST endpoints
(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .factory('FacultyhomepagesService', FacultyhomepagesService);

  FacultyhomepagesService.$inject = ['$resource'];

  function FacultyhomepagesService($resource) {
    return $resource('api/facultyhomepages/:facultyhomepageId', {
      facultyhomepageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
