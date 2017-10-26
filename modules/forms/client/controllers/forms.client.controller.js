(function () {
    'use strict';
    // Forms controller
    angular
        .module('forms')
        .controller('FormsController', FormsController);

    FormsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'formResolve', 'CoursesService'];

    function FormsController($scope, $state, $window, Authentication, form, CoursesService) {
        var vm = this;
        vm.courses = CoursesService.query();
        vm.semesterOptions = semesterOptions();
        vm.authentication = Authentication;
        vm.form = form;
        vm.error = null;
        vm.remove = remove;
        vm.save = save;

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
            if (vm.form.username) {
                vm.form.$update(successCallback, errorCallback);
            } else {
                vm.form.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('forms.undergrad');
                /*
               $state.go('forms.undergrad', {
                 formId: res._id
               });
               */
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
}());
