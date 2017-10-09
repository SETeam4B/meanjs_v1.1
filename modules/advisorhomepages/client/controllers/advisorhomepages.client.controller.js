(function () {
  'use strict';

  // Advisorhomepages controller
  angular
    .module('advisorhomepages')
    .controller('AdvisorhomepagesController', AdvisorhomepagesController);

  AdvisorhomepagesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'advisorhomepageResolve'];

  function AdvisorhomepagesController ($scope, $state, $window, Authentication, advisorhomepage) {
    var vm = this;

    vm.authentication = Authentication;
    vm.advisorhomepage = advisorhomepage;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    $scope.yolo = "hello World";

    // Remove existing Advisorhomepage
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.advisorhomepage.$remove($state.go('advisorhomepages.list'));
      }
    }

    // Save Advisorhomepage
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.advisorhomepageForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.advisorhomepage._id) {
        vm.advisorhomepage.$update(successCallback, errorCallback);
      } else {
        vm.advisorhomepage.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('advisorhomepages.view', {
          advisorhomepageId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
