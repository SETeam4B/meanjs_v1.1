(function () {
  'use strict';

  angular
    .module('ta-coordinators')
    .controller('TaCoordinatorsListController', TaCoordinatorsListController);

  TaCoordinatorsListController.$inject = ['TaCoordinatorsService'];

  function TaCoordinatorsListController(TaCoordinatorsService) {
    var vm = this;

    vm.taCoordinators = TaCoordinatorsService.query();
  }
}());
