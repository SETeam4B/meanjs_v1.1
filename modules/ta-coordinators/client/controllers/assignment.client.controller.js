(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('AssignmentController', AssignmentController);

    AssignmentController.inject =  ['$scope','CoursesService','Authentication','$state','$rootScope','$stateParams','AssignmentrecommendationsService',"Users"];

    function AssignmentController($scope, CoursesService,Authentication, $state,$rootScope, $stateParams,AssignmentrecommendationsService,Users) {

        $scope.courseId = $stateParams.courseId;
        $scope.courseTitle = $stateParams.courseTitle;
        $scope.TAlist = {};
        $scope.UTAlist = {};
        $scope.Graderlist = {};
        $scope.Rejectedlist= {};
        $scope.course = CoursesService.get($stateParams.courseId);

        //faculty recommendation list from database
        $scope.FacultyRecommendationList = [];

        //fetched from database
        $scope.AssignmentList = [];

        //ta coordinators choice of assignment
        $scope.TACoordinatorAssignmentList = [];

        $scope.assignTA =function (form)
        {
            var AssignmentObject = {course: $scope.courseId, user:form.user, form:form, assigned: "Yes"};
            $scope.TACoordinatorAssignmentList.push(AssignmentObject);
        };

        $scope.removeFromAssignment= function(form)
        {
            var index = $scope.AssignmentList.indexOf(form);
            $scope.AssignmentList.splice(index,1);
        }

        $scope.submitMyAssignment = function()
        {
            //passing FacultyRecommendationList to backend services

            for(var i = 0; i < $scope.TACoordinatorAssignmentList.length; i++) {

                var obj= new AssignmentrecommendationsService(
                    {
                        course: $scope.courseId ,
                        user: $scope.TACoordinatorAssignmentList[i].form.user,
                        form: $scope.TACoordinatorAssignmentList[i].form._id,
                        assigned:"No"
                    }
                );

                obj.$save();
            }
            $state.go('ta-coordinators.facultyCourseList');


        }
        AssignmentrecommendationsService.getAccepted(successCallback, errorCallback);
        function successCallback(res) {
            console.log("success");
            $scope.TAlist = res.data.TA;
            $scope.UTAlist = res.data.UTA;
            $scope.Graderlist = res.data.Grader;
        }
        function errorCallback() {
            console.log("failed");
        }
        AssignmentrecommendationsService.getRejected(successCallback2, errorCallback2);
        function successCallback2(res) {
            console.log("success");
            $scope.Rejectedlist = res.data;
        }
        function errorCallback2() {
            console.log("failed");
        }




    }

}());
