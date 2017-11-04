(function () {
  'use strict';

  // Ta coordinators controller
  angular
    .module('ta-coordinators')
    .controller('TaCoordinatorsStatusController', TaCoordinatorsStatusController);

  TaCoordinatorsStatusController.$inject = ['$scope', '$state', '$window', 'Authentication', 'TaCoordinatorsStatusService', 'statusResolve'];

  function TaCoordinatorsStatusController ($scope, $state, $window, Authentication, TaCoordinatorsStatusService, status) {
    var vm = this;
    vm.authentication = Authentication;
    vm.semesterOptions = semesterOptions();
    vm.status= status;
    vm.save = save;

    function save(){

      if (vm.status._id) {
        vm.status.$update(updateSuccessCallback, errorCallback);
        }
        else {
          vm.status.$save(successCallback, errorCallback);
        }
    }

    function updateSuccessCallback(res) {
      alert("Successfully updated status.");
        // if($scope.isAdvisorForm){
        //     alert("updated advisor form");
        //     return;
        // }
    }

    function successCallback(res) {
      alert("Succesfully updated status.");
        // if($scope.isAdvisorForm){
        //     alert("submitted advisor form");
        //     return;
        // }
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


  }
}());
