(function () {
    'use strict';
    // Forms controller
    angular
        .module('forms')
        .controller('FormsController', FormsController);

    FormsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'formResolve', 'CoursesService','CountriesService'];

    function FormsController($scope, $state, $window, Authentication, form, CoursesService, CountriesService) {
        var vm = this;
        vm.courses = CoursesService.query();
        vm.semesterOptions = semesterOptions();
        vm.statusOptions = statusOptions();
        vm.countryOptions = CountriesService.allCountries();
        vm.offerTypeOptions = offerTypeOptions();
        vm.categoryOptions = categoryOptions();
        vm.teachingTAOptions = teachingTAOptions();
        vm.authentication = Authentication;

        vm.form = form;
        vm.error = null;
        vm.phdExamDate = formatDate();
        vm.remove = remove;
        vm.save = save;

        function statusOptions(){
            var status = [];
            status.push("N/A");
            status.push("Pending");
            status.push("Accepted");
            status.push("Rejected");
            return status;
        }

        function offerTypeOptions(){
            var offerTypes =[];
            offerTypes.push("TA");
            offerTypes.push("RA");
            return offerTypes;
        }
        function categoryOptions(){
            var category = [];
            category.push("TA");
            category.push("Grader");
            category.push("UTA");
        }
        function teachingTAOptions(){
            var teachingTA = [];
            teachingTA.push("Yes");
            teachingTA.push("No");
            return teachingTA;
        }
        function formatDate(){
            var examDate = new Date(vm.form.phdExamDate);
            var year = examDate.getFullYear();
            var month = examDate.getMonth();

            var day = examDate.getDate();
            if(month >= 10)
            {
                return year + '-' + month + '-' + day;
            }
            else
            {
                return year + '-0' + month + '-' + day;
            }
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
