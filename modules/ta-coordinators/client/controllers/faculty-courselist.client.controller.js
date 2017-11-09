(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('facultyCourseListController', facultyCourseListController);

    facultyCourseListController.inject = ['$scope','CoursesService','Authentication','$state','$rootScope'];

    function facultyCourseListController($scope, CoursesService,Authentication, $state,$rootScope) {
        var vm = this;

        $scope.courses = filteredCourse();

        function filteredCourse() {
            var selectedCourses = [];
             var allCourses = CoursesService.query(function(courses){

                 angular.forEach(courses,function(course){
                     if(course.instructor.indexOf(Authentication.user.lastName)!== -1)  {
                         selectedCourses.push(course);
                         }
                     });

                 });

            return selectedCourses;
        }

        $scope.recommend =function (courseId)
        {

            $state.go('ta-coordinators.recommendation',{
                courseId: courseId
        });
        };


    }

}());
