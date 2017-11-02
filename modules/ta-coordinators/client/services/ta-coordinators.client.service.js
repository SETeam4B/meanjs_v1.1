// Ta coordinators service used to communicate Ta coordinators REST endpoints
(function () {
  'use strict';

  angular
    .module('ta-coordinators')
    .factory('TaCoordinatorsService', TaCoordinatorsService);

  TaCoordinatorsService.$inject = ['$resource'];

  function TaCoordinatorsService($resource) {
    return $resource('api/ta-coordinators/:taCoordinatorId', {
      taCoordinatorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function TaCoordinatorsStatusService($resource) {
    return $resource('api/ta-coordinators/status', {
      update: {
        method: 'PUT'
      }
    });
  }
}());
