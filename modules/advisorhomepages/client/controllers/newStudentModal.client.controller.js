(function () {
    'use strict';

    angular
        .module('advisorhomepages')
        .controller('NewStudentModalController', NewStudentModalController);

    NewStudentModalController.inject = ['$scope', '$modal', 'ui.router'];

    function NewStudentModalController($scope) {
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
        $scope.formIndex = 0;

        $scope.setIndex = function(index){
            $scope.formIndex = index;
        }

    }
}());
