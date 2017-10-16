// Courses service used to communicate Courses REST endpoints

'use strict';

angular.module('courses').factory('CoursesService', ['$resource',
    function ($resource) {
        return $resource('api/courses/:courseId', {
            courseId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    },
]);
