(function () {
    'use strict';

    angular
        .module('forms')
        // .module('advisorhomepages')
        .controller('DummyControllerRecommendations', DummyControllerRecommendations);

    DummyControllerRecommendations.inject = ['$scope', '$state', 'AssignmentrecommendationsService','CoursesService'];

    function DummyControllerRecommendations($scope,$state, AssignmentrecommendationsService, CoursesService) {
        $scope.testDummyController = function () {
            // debugger;
            // var courses ="";
            // CoursesService.query(function (res) {
            //     courses = res [0];
            //     // var ass = new AssignmentrecommendationsService({courses:courses});
            //     // ass.$getCourseRecommended(successCallback, errorCallback);
            //     AssignmentrecommendationsService.getCourseRecommended({courseId:"59f654bf803fe1180996038d", courseNumber:2},successCallback, errorCallback);
            // });

            // AssignmentrecommendationsService.getCourseRecommended(successCallback, errorCallback);

            // AssignmentrecommendationsService.getRejected(successCallback, errorCallback);
            // AssignmentrecommendationsService.getAccepted(successCallback, errorCallback);
            var assignment = new AssignmentrecommendationsService();
            assignment._id = '5a0b16eb49a702e5176d6300';
            assignment.assigned  = "Yes";
            assignment.$assignStudent(successCallback, errorCallback);

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
