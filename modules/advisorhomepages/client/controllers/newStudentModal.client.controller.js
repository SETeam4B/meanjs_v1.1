
(function () {
    'use strict';

    angular
        .module('forms')
        // .module('advisorhomepages')
        .controller('NewStudentModalController', NewStudentModalController);

    NewStudentModalController.inject = ['$scope', '$state','$modal', 'ui.router'];
// retrieve the application form from forms module and linked them to advisor page.
    function NewStudentModalController($scope,$state) {
        $scope.modalForms = [
            {
                formName: "Master",
                url:'modules/forms/client/views/master-form.client.view.html',
            },
            {
                formName: "UnderGrad",
                url:'modules/forms/client/views/undergrad-form.client.view.html',
            },
            {
                formName: "PHD",
                url:'modules/forms/client/views/phd-form.client.view.html',
            }
        ];

        $scope.isAdvisorForm = true;
        $scope.formIndex = 0;
        $scope.setIndex = function(index){
            $scope.formIndex = index;
        }

    }
}());
