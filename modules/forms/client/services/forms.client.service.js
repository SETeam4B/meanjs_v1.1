// Forms service used to communicate Forms REST endpoints
(function () {
    'use strict';

    angular
        .module('forms')
        .factory('FormsService', FormsService);

    FormsService.$inject = ['$resource'];

    function FormsService($resource) {
        return $resource('api/forms/', {
            username: '@username'
        }, {
            update: {
                method: 'PUT'
            },
            getAll:{
                method: 'GET',
                url: '/api/forms/allForms'
            },
            updateFromAdvisor:{
                method: 'PUT',
                url: '/api/forms/updateStudentAdvisor'
            },
            addFromAdvisor:{
                method: 'POST',
                url: '/api/forms/updateStudentAdvisor'
            }
        });
    }
}());
