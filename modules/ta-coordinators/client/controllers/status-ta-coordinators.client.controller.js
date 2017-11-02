(function () {
  'use strict';

  // Ta coordinators controller
  angular
    .module('ta-coordinators')
    .controller('TaCoordinatorsStatusController', TaCoordinatorsStatusController);

  TaCoordinatorsStatusController.$inject = ['$scope', '$state', '$window', 'Authentication', 'TaCoordinatorsStatusService'];

  function TaCoordinatorsStatusController ($scope, $state, $window, Authentication, TaCoordinatorsStatusService) {
    var vm = this;
    vm.authentication = Authentication;
    vm.semesterOptions = semesterOptions();
    vm.status= TaCoordinatorsStatusService;

    vm.save = save;

    $scope.submit = function(){
      console.log($scope.undergrad);
      console.log($scope.grad);
      console.log($scope.faculty);
      console.log($scope.gpa);
      console.log($scope.studentassignment);
      console.log($scope.facultyassignment);
      console.log($scope.update_semester);


      if (vm.status) {
        vm.status.$update(updateSuccessCallback, errorCallback);
        }
        else {
          vm.status.$save(successCallback, errorCallback);
        }
    }

    function updateSuccessCallback(res) {
        // if($scope.isAdvisorForm){
        //     alert("updated advisor form");
        //     return;
        // }
        $state.go('forms.update');
    }

    function successCallback(res) {
        // if($scope.isAdvisorForm){
        //     alert("submitted advisor form");
        //     return;
        // }
        $state.go('forms.submit');
        /*
       $state.go('forms.undergrad', {
         formId: res._id
       });
       */
    }

    function errorCallback(res) {
        vm.error = res.data.message;
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

    // Save status
    function save(isValid) {

        if (vm.status) {
            vm.status.$update(updateSuccessCallback, errorCallback);
        } else {
            vm.status.$save(successCallback, errorCallback);
        }

    }

  }
}());
