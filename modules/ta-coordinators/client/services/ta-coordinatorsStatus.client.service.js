// Ta coordinators service used to communicate Ta coordinators REST endpoints
(function () {
  'use strict';

  angular
    .module('ta-coordinators')
    .factory('TaCoordinatorsStatusService', TaCoordinatorsStatusService);

  TaCoordinatorsStatusService.$inject = ['$resource'];

  function TaCoordinatorsStatusService($resource) {
    return $resource('api/ta-coordinators/status', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

}());


