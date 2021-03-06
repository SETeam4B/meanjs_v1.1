// Assignmentrecommendations service used to communicate Assignmentrecommendations REST endpoints
(function () {
    'use strict';

    angular
        .module('assignmentrecommendations')
        .factory('AssignmentrecommendationsService', AssignmentrecommendationsService);

    AssignmentrecommendationsService.$inject = ['$resource'];

    function AssignmentrecommendationsService($resource) {
        return $resource('api/assignmentrecommendations/:assignmentrecommendationId', {
            assignmentrecommendationId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            getRejected: {
                method: 'GET',
                url: '/api/rejected'
            },
            getAccepted: {
                method: 'GET',
                url: '/api/accepted'
            },
            getAcceptedWithHour: {
                method: 'GET',
                url: '/api/acceptedWithHour'
            },
            removeStudent:{
                method:'PUT',
                url:'/api/removeStudent'
            },
            getCourseRecommended: {
                method: 'GET',
                url: '/api/courseRecommendation',
                params: {}
            },
            assignStudent:{
                method: 'PUT',
                url: '/api/assignStudent'
            },
            getAssignedStudents:{
              method: 'GET',
              url: '/api/assignStudent'
            },
            getProfessorRecommended:{
                method: 'GET',
                url: 'api/professorRecommended'
            }
        });
    }
}());
