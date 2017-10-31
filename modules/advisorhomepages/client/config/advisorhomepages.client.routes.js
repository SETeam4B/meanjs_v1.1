(function () {
    'use strict';

    angular
        .module('forms')
        // .module('advisorhomepages')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('advisorhomepages', {
                abstract: true,
                url: '/advisorhomepage',
                //template: '<ui-view/>'
                template: '<div><div ui-view></div></div></div>'
            })
            .state('advisorhomepages.list', {
                url: '',
                templateUrl: 'modules/advisorhomepages/client/views/ta-candidates.client.view.html',
                controller: 'FormsController',
                controllerAs: 'vm',
                resolve: {
                    formResolve: formHandler
                },
                data: {
                    pageTitle: 'Advisorhomepages List'
                }
            })
            .state('advisorhomepages.create', {
                url: '/course-list',
                templateUrl: 'modules/advisorhomepages/client/views/course-list.client.view.html',
                controller: 'AdvisorhomepagesController',
                controllerAs: 'vm',
                resolve: {
                    advisorhomepageResolve: newAdvisorhomepage
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Advisorhomepages Create'
                }
            })
            .state('advisorhomepages.edit', {
                url: '/:advisorhomepageId/edit',
                templateUrl: 'modules/advisorhomepages/client/views/course-list.client.view.html',
                controller: 'AdvisorhomepagesController',
                controllerAs: 'vm',
                resolve: {
                    advisorhomepageResolve: getAdvisorhomepage
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Edit Advisorhomepage {{ advisorhomepageResolve.name }}'
                }
            })
            //TODO: delete this probably
            .state('advisorhomepages.view', {
                url: '/:advisorhomepageId',
                templateUrl: 'modules/advisorhomepages/client/views/view-advisorhomepage.client.view.html',
                controller: 'AdvisorhomepagesController',
                controllerAs: 'vm',
                resolve: {
                    advisorhomepageResolve: getAdvisorhomepage
                },
                data: {
                    pageTitle: 'Advisorhomepage {{ advisorhomepageResolve.name }}'
                }
            })
            .state('advisorhomepages.modal', {
                url: '/:advisorhomepageId/modal',
                // templateUrl: 'modules/advisorhomepages/client/views/view-advisorhomepage.client.view.html',
                // controller: 'AdvisorhomepagesController',
                // controllerAs: 'vm',
                views:{
                    "a":{
                        template: '<div>yoooooooooordiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</div>'
                    }
                    ,
                    "":{
                        templateUrl: '<div>adghdsoghaldsjghqowiehto</div>'
                    }
                },
                resolve: {
                    advisorhomepageResolve: getAdvisorhomepage
                },
                data: {
                    pageTitle: 'Advisorhomepage {{ advisorhomepageResolve.name }}'
                }
            })
        ;
    }

    getAdvisorhomepage.$inject = ['$stateParams', 'AdvisorhomepagesService'];

    function getAdvisorhomepage($stateParams, AdvisorhomepagesService) {
        return AdvisorhomepagesService.get({
            advisorhomepageId: $stateParams.advisorhomepageId
        }).$promise;
    }

    newAdvisorhomepage.$inject = ['AdvisorhomepagesService'];

    function newAdvisorhomepage(AdvisorhomepagesService) {
        return new AdvisorhomepagesService();
    }

    formHandler.$inject = ['$stateParams', 'FormsService', 'Authentication'];
    function formHandler($stateParams, FormsService, Authentication){

        console.log(Authentication.user)
        return FormsService.get();
    }


}());
