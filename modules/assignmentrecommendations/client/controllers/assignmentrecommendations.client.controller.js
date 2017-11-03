(function () {
  'use strict';

  // Assignmentrecommendations controller
  angular
    .module('assignmentrecommendations')
    .controller('AssignmentrecommendationsController', AssignmentrecommendationsController);

  AssignmentrecommendationsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'assignmentrecommendationResolve'];

  function AssignmentrecommendationsController ($scope, $state, $window, Authentication, assignmentrecommendation) {
    var vm = this;

    vm.authentication = Authentication;
    vm.assignmentrecommendation = assignmentrecommendation;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Assignmentrecommendation
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.assignmentrecommendation.$remove($state.go('assignmentrecommendations.list'));
      }
    }

    // Save Assignmentrecommendation
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.assignmentrecommendationForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.assignmentrecommendation._id) {
        vm.assignmentrecommendation.$update(successCallback, errorCallback);
      } else {
        vm.assignmentrecommendation.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('assignmentrecommendations.view', {
          assignmentrecommendationId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
