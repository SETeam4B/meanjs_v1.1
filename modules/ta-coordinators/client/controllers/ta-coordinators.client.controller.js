(function () {
  'use strict';

  // Ta coordinators controller
  angular
    .module('ta-coordinators')
    .controller('TaCoordinatorsController', TaCoordinatorsController);

  TaCoordinatorsController.$inject = ['$scope', '$state', '$window', 'Authentication','CoursesService'];

  function TaCoordinatorsController ($scope, $state, $window, Authentication, CoursesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

vm.semester = currentSemester();
     $scope.coursesData = CoursesService.query();
    // Remove existing Ta coordinator

      function currentSemester(){
          var currentDate = new Date();
          var year = currentDate.getFullYear();
          var month = currentDate.getMonth()+1;
          var semester = 1;
          var semesterInLetter = "SPRING";

          // April - October, the Fall semester's schedule would be available, the code for fall semester is 08, and 01 for spring semester.
          if (month >= 4 && month < 10) {
              semester = 8;
              semesterInLetter = "FALL";
          }

          if (semester === 1) {
              year = year + 1;
          }
          return semesterInLetter + " " + year;

      }

      $scope.updatingCourse = function (course) {
          course.$update(successCallback, errorCallback);

      function successCallback(res) {
      }
      function errorCallback(res) {
         console.log( res.data.message);
      }
  }


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
