(function () {
  'use strict';

  // Ta coordinators controller
  angular
    .module('ta-coordinators')
    .controller('TaCoordinatorsStatusController', TaCoordinatorsStatusController);

  TaCoordinatorsStatusController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function TaCoordinatorsStatusController ($scope, $state, $window, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.semesterOptions = semesterOptions()
    $scope.submit = function(){
      console.log($scope.undergrad);
      console.log($scope.grad);
      console.log($scope.faculty);
      console.log($scope.gpa);
      console.log($scope.studentassignment);
      console.log($scope.facultyassignment);
      console.log($scope.update_semester);
    }


    function semesterOptions(){
        var term = ['Spring', 'Summer', 'Fall'];
        var semesters = [];
        var date = new Date();
        var year = date.getFullYear();
        for (var i = year; i > year - 7; i--) {
            term.forEach(function(item, index){
                semesters.push(i+" "+item);
            });
        }
        return semesters;
    }

  }
}());
