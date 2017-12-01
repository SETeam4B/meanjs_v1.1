(function () {
  'use strict';

  angular
    .module('ta-coordinators')
    .controller('TaCoordinatorsListController', TaCoordinatorsListController);

  TaCoordinatorsListController.$inject = ['TaCoordinatorsService'];


 /*
 retrieves all the ta-coordinators in the database. this is come by default.
  */
  function TaCoordinatorsListController(TaCoordinatorsService) {
    var vm = this;
    vm.taCoordinators = TaCoordinatorsService.query();
  }
}());
