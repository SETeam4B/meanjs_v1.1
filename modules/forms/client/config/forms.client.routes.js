(function () {
    'use strict';

    angular
        .module('forms')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('forms', {
                abstract: true,
                url: '/forms',
                controller:'NavBarController',
                template: '<ui-view/>',
                templateUrl: 'modules/forms/client/views/nav-bar-forms.client.view.html'
            })
            .state('forms.list', {
                url: '',
                templateUrl: 'modules/forms/client/views/list-forms.client.view.html',
                controller: 'FormsListController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Forms List'
                }
            })
            .state('forms.undergrad', {
                url: '/create/undergrad',
                templateUrl: 'modules/forms/client/views/undergrad-form.client.view.html',
                controller: 'FormsController',

                controllerAs: 'vm',
                resolve: {
                    formResolve: formHandler
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Forms Create'
                }
            })
            .state('forms.master', {
                url: '/create/master',
                templateUrl: 'modules/forms/client/views/master-form.client.view.html',
                controller: 'FormsController',
                controllerAs: 'vm',
                resolve: {
                    formResolve: formHandler
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Forms Create'
                }
            })
            .state('forms.phd', {
                url: '/create/phd',
                templateUrl: 'modules/forms/client/views/phd-form.client.view.html',
                controller: 'FormsController',
                controllerAs: 'vm',
                resolve: {
                    formResolve: formHandler
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Forms Create'
                }
            })
            .state('forms.edit', {
                url: '/:formId/edit',
                templateUrl: 'modules/forms/client/views/undergrad-form.client.view.html',
                controller: 'FormsController',
                controllerAs: 'vm',
                resolve: {
                    formResolve: formHandler
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Edit Form {{ formResolve.name }}'
                }
            })
            .state('forms.view', {
                url: '/:formId',
                templateUrl: 'modules/forms/client/views/view-form.client.view.html',
                controller: 'FormsController',
                controllerAs: 'vm',
                resolve: {
                    formResolve: formHandler
                },
                data: {
                    pageTitle: 'Form {{ formResolve.name }}'
                }
            })
            .state('forms.submit',{
                url: '/form/submited',
                templateUrl: 'modules/forms/client/views/submit.confirmation.view.html',
                controller: 'FormsController',
                controllerAs: 'vm'
            })
            .state('forms.update',{
            url: '/form/updated',
            templateUrl: 'modules/forms/client/views/update.confirmation.view.html',
            controller: 'FormsController',
            controllerAs: 'vm'
        });
    }

    //getForm.$inject = ['$stateParams', 'FormsService', 'Authentication'];
    /*
    function getForm($stateParams, FormsService, Authentication) {
        return FormsService.get({
            username: Authentication.user.username
        }).$promise;
    }

    newForm.$inject = ['FormsService'];

    function newForm(FormsService) {
        return new FormsService();
    }
    */
    formHandler.$inject = ['$stateParams', 'FormsService', 'Authentication'];
    function formHandler($stateParams, FormsService, Authentication){
        return FormsService.get({
            username: Authentication.user.username
        }).$promise;
    }



}());
