(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('RecommendationAssignmentController', RecommendationAssignmentController);

    RecommendationAssignmentController.inject =  ['$scope','CoursesService','Authentication','$state','$rootScope','$stateParams','AssignmentrecommendationsService',"Users"];

    function RecommendationAssignmentController($scope, CoursesService,Authentication, $state,$rootScope, $stateParams,AssignmentrecommendationsService,Users) {

     $scope.courseId = $stateParams.courseId;
     $scope.courseTitle = $stateParams.courseTitle;
     $scope.TAlist = {};
     $scope.UTAlist = {};
     $scope.Graderlist = {};
     $scope.SystemRecommendedlist = [] ;
     $scope.Rejectedlist= {};
     $scope.course = CoursesService.get($stateParams.courseId);

     //fetched from database
     $scope.recommendedList=[];

     $scope.FacultyRecommendationList = []

     $scope.recommendTA =function (form)
        {
            var recommendationObj = {course: $scope.courseId, user:form.user, form:form, assigned: 'false'};
            $scope.FacultyRecommendationList.push(recommendationObj);

        };

     $scope.removeFromRecommendationDatabase = function(User)
     {
         var index = $scope.recommendedList.indexOf(User);
         $scope.recommendedList.splice(index,1);
     };

     $scope.removeFromRecommendation= function(form)
     {
         var index = $scope.FacultyRecommendationList.indexOf(form);
            $scope.FacultyRecommendationList.splice(index,1);
     }

     $scope.submitMyRecommendation = function()
     {
         //passing FacultyRecommendationList to backend services

         for(var i = 0; i < $scope.FacultyRecommendationList.length; i++) {

             var obj= new AssignmentrecommendationsService(
                 {
                     course: $scope.courseId + "",
                     user: $scope.FacultyRecommendationList[i].form.user +"",
                     form: $scope.FacultyRecommendationList[i].form._id + "",
                     assigned: "false"
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

        AssignmentrecommendationsService.getCourseRecommended({courseId:$stateParams.courseId, courseNumber:1},successCallback3, errorCallback3);

        function successCallback3(res) {
            console.log("success");

            $scope.SystemRecommendedlist= $scope.SystemRecommendedlist.concat(res.data).unique();
        }
        function errorCallback3() {
            console.log("failed");
        }
        AssignmentrecommendationsService.getCourseRecommended({courseId:$stateParams.courseId, courseNumber:2},successCallback4, errorCallback4);

        function successCallback4(res) {
            console.log("success");

            $scope.SystemRecommendedlist = $scope.SystemRecommendedlist.concat(res.data).unique();
        }
        function errorCallback4() {
            console.log("failed");
        }
        AssignmentrecommendationsService.getCourseRecommended({courseId:$stateParams.courseId, courseNumber:3},successCallback5, errorCallback5);

        function successCallback5(res) {

            console.log("success");

            $scope.SystemRecommendedlist = $scope.SystemRecommendedlist.concat(res.data).unique();


        }
        function errorCallback5() {
            console.log("failed");
        }


        AssignmentrecommendationsService.getProfessorRecommended({courseId:$stateParams.courseId},successCallback6, errorCallback6);
        function successCallback6(res) {

            console.log("success");


            $scope.recommendedList = res.data.unique();

        }
        function errorCallback6() {
            console.log("failed");
        }

        Array.prototype.unique = function() {
            var a = this.concat();
            for(var i=0; i<a.length; ++i) {
                for(var j=i+1; j<a.length; ++j) {
                    if(a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };

    }

}());
