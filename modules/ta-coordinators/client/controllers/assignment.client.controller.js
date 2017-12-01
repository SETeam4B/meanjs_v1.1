(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('AssignmentController', AssignmentController);

    AssignmentController.inject =  ['$scope','CoursesService','Authentication','$state','$rootScope','$stateParams','AssignmentrecommendationsService',"Users"];
//controller for assignments
    function AssignmentController($scope, CoursesService,Authentication, $state,$rootScope, $stateParams,AssignmentrecommendationsService,Users) {

        $scope.courseId = $stateParams.courseId;
        $scope.courseTitle = $stateParams.courseTitle;
        $scope.TAlist = {};
        $scope.UTAlist = {};
        $scope.Graderlist = {};
        $scope.Rejectedlist= {};
        $scope.course = CoursesService.get($stateParams.courseId);

        //faculty recommendation list from database
        $scope.FacultyRecommendationLists = {};

        //fetched from database
        $scope.AssignmentList = [];

        //ta coordinators choice of assignment
        $scope.TACoordinatorAssignmentList = [];

        $scope.assignTA =function (form)
        {
            var AssignmentObject = {course: $scope.courseId, user:form.user, form:form, assigned: "true"};
            $scope.TACoordinatorAssignmentList.push(AssignmentObject);
        };
        //remove the assigned student from database.
$scope.removeFromDatabase = function(form){
    AssignmentrecommendationsService.removeStudent({user: form.user, course:$stateParams.courseId},successCallback8, errorCallback8);
    AssignmentrecommendationsService.getAssignedStudents({courseId:$stateParams.courseId},successCallback7, errorCallback7);
};
        function successCallback8(res) {

            console.log("success");
        }
        function errorCallback8() {
            console.log("failed");
        }
// remove the student from the assignment list which is not yet stored into database yet.
        $scope.removeFromAssignment= function(form)
        {
            var index = $scope.TACoordinatorAssignmentList.indexOf(form);
            $scope.TACoordinatorAssignmentList.splice(index,1);
        }

        // store the assignment list into database
        $scope.submitMyAssignment = function()
        {
            //passing FacultyRecommendationList to backend services

            for(var i = 0; i < $scope.TACoordinatorAssignmentList.length; i++) {

                var obj= new AssignmentrecommendationsService();
                obj.user = $scope.TACoordinatorAssignmentList[i].form.user;
                obj.course = $scope.courseId;
                obj.assigned =true;
                obj.form = $scope.TACoordinatorAssignmentList[i].form._id;

                obj.$assignStudent();
            }
            $state.go('ta-coordinators.tacoordinatorCourseList');


        }


        AssignmentrecommendationsService.getProfessorRecommended({courseId:$stateParams.courseId},successCallback6, errorCallback6);
        function successCallback6(res) {

            console.log("success");

            $scope.FacultyRecommendationLists = res.data;

            console.log($scope.FacultyRecommendationLists);

        }
        function errorCallback6() {
            console.log("failed");
        }

        AssignmentrecommendationsService.getAcceptedWithHour(successCallback, errorCallback);
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



        AssignmentrecommendationsService.getAssignedStudents({courseId:$stateParams.courseId},successCallback7, errorCallback7);
        function successCallback7(res) {

            console.log("success");
            $scope.AssignmentList = res.data;

            console.log($scope.AssignmentList);
        }
        function errorCallback7() {
            console.log("failed");
        }


    }

}());
