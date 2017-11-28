(function () {
  'use strict';

  angular
    .module('assignmentrecommendations')
    .controller('AssignmentrecommendationsListController', AssignmentrecommendationsListController);

  AssignmentrecommendationsListController.$inject = ['AssignmentrecommendationsService'];

  function AssignmentrecommendationsListController(AssignmentrecommendationsService) {
    var vm = this;

    vm.assignmentrecommendations = AssignmentrecommendationsService.query();
  }
}());
