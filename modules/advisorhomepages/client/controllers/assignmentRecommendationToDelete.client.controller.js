(function () {
    'use strict';

    angular
        .module('forms')
        // .module('advisorhomepages')
        .controller('DummyControllerRecommendations', DummyControllerRecommendations);

    DummyControllerRecommendations.inject = ['$scope', '$state', 'AssignmentrecommendationsService'];

    function DummyControllerRecommendations($scope,$state, AssignmentrecommendationsService) {
        $scope.testDummyController = function () {
            alert("Dummy controller");
            AssignmentrecommendationsService.getRejected(successCallback, errorCallback);
            function successCallback(res) {
                console.log("success");
                debugger;
            }
            function errorCallback() {
                console.log("failed");
            }
        }
    }





}());
