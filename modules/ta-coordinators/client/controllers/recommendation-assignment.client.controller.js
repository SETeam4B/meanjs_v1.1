(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('RecommendationAssignmentController', RecommendationAssignmentController);

    RecommendationAssignmentController.inject =  ['$scope','CoursesService','Authentication','$state','$rootScope','$stateParams','AssignmentrecommendationsService',"Users"];

    //controller for handling the recomendation page
    function RecommendationAssignmentController($scope, CoursesService,Authentication, $state,$rootScope, $stateParams,AssignmentrecommendationsService,Users) {

     $scope.courseId = $stateParams.courseId;
     $scope.courseTitle = $stateParams.courseTitle;
     $scope.TAlist = {};
     $scope.UTAlist = {};
     $scope.Graderlist = {};
     $scope.SystemRecommendedlist = [] ;
     $scope.Rejectedlist= {};
     $scope.course = CoursesService.get($stateParams.courseId);
     $scope.authentication = Authentication;
     //fetched from database
     $scope.recommendedList=[];

     //the recommendation list from faculty
     $scope.FacultyRecommendationList = []

        //adding the Ta into the faculty recommendation list
     $scope.recommendTA =function (form)
        {
            var recommendationObj = {course: $scope.courseId, user:form.user, form:form, assigned: 'false'};
            $scope.FacultyRecommendationList.push(recommendationObj);

        };

//remove the student from the database
        $scope.removeFromDatabase = function(form){
            AssignmentrecommendationsService.removeStudent({user: form.user, course:$stateParams.courseId},successCallback8, errorCallback8);
            AssignmentrecommendationsService.getProfessorRecommended({courseId:$stateParams.courseId},successCallback6, errorCallback6);
        };

        function successCallback8(res) {

            console.log("success");

        }
        function errorCallback8() {
            console.log("failed");
        }

        //remove the student from the faculty recommendation list which has not been stored into database yet.
     $scope.removeFromRecommendation= function(form)
     {
         var index = $scope.FacultyRecommendationList.indexOf(form);
            $scope.FacultyRecommendationList.splice(index,1);
     }

     //store the recommendation list into database.
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

        // check the unique of the array, make sure the no duplicated students in the list.
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
