(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('RecommendationAssignmentController', RecommendationAssignmentController);

    RecommendationAssignmentController.inject =  ['$scope','CoursesService','Authentication','$state','$rootScope','$stateParams','AssignmentrecommendationsService'];

    function RecommendationAssignmentController($scope, CoursesService,Authentication, $state,$rootScope, $stateParams,AssignmentrecommendationsService) {

     $scope.courseId = $stateParams.courseId;

     $scope.TAlist = AssignmentrecommendationsService.getAccepted(successCallback, errorCallback);






    }

}());
