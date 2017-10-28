(function () {
  'use strict';

  // Facultyhomepages controller
  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesController', FacultyhomepagesController);

  FacultyhomepagesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'facultyhomepageResolve'];

  function FacultyhomepagesController ($scope, $state, $window, Authentication, facultyhomepage) {
    var vm = this;

    vm.authentication = Authentication;
    vm.facultyhomepage = facultyhomepage;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Facultyhomepage
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.facultyhomepage.$remove($state.go('facultyhomepages.list'));
      }
    }

    // Save Facultyhomepage
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.facultyhomepageForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.facultyhomepage._id) {
        vm.facultyhomepage.$update(successCallback, errorCallback);
      } else {
        vm.facultyhomepage.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('facultyhomepages.view', {
          facultyhomepageId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
