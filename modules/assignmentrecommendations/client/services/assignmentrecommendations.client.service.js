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
            }
        });
    }
}());
