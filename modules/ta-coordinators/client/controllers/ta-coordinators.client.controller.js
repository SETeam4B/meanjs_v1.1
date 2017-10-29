(function () {
  'use strict';

  // Ta coordinators controller
  angular
    .module('ta-coordinators')
    .controller('TaCoordinatorsController', TaCoordinatorsController);

  TaCoordinatorsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'taCoordinatorResolve', 'CoursesService'];

  function TaCoordinatorsController ($scope, $state, $window, Authentication, taCoordinator, CoursesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.taCoordinator = taCoordinator;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.courses=CoursesService.query();

    // Remove existing Ta coordinator
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.taCoordinator.$remove($state.go('ta-coordinators.list'));
      }
    }

    // Save Ta coordinator
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.taCoordinatorForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.taCoordinator._id) {
        vm.taCoordinator.$update(successCallback, errorCallback);
      } else {
        vm.taCoordinator.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('ta-coordinators.view', {
          taCoordinatorId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
