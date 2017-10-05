(function () {
  'use strict';

  // Forms controller
  angular
    .module('forms')
    .controller('FormsController', FormsController);

  FormsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'formResolve'];

  function FormsController ($scope, $state, $window, Authentication, form) {
    var vm = this;

    vm.authentication = Authentication;
    vm.form = form;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Form
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.form.$remove($state.go('forms.list'));
      }
    }

    // Save Form
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.formForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.form._id) {
        vm.form.$update(successCallback, errorCallback);
      } else {
        vm.form.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('forms.view', {
          formId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
