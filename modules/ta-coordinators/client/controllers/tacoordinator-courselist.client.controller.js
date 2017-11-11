(function () {
    'use strict';

    angular
        .module('ta-coordinators')
        .controller('tacoordinatorCourseListController', tacoordinatorCourseListController);

    tacoordinatorCourseListController.inject = ['$scope','CoursesService','Authentication','$state','$rootScope'];

    function tacoordinatorCourseListController($scope, CoursesService,Authentication, $state,$rootScope) {
        var vm = this;

        $scope.courses = CoursesService.query();


        $scope.assign =function (courseTitle,courseId)
        {

            $state.go('ta-coordinators.assignment',{
                courseId: courseId,
                courseTitle: courseTitle
            });
        };


    }

}());
