(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('facultyhomepages', {
        abstract: true,
        url: '/facultyhomepages',
        template: '<ui-view/>'
      })
      .state('facultyhomepages.list', {
        url: '',
        templateUrl: 'modules/facultyhomepages/client/views/list-facultyhomepages.client.view.html',
        controller: 'FacultyhomepagesListController',
        controllerAs: 'vm',
        data: {
          roles:['faculty'],
          pageTitle: 'Facultyhomepages List'
        }
      })
      .state('facultyhomepages.create', {
        url: '/create',
        templateUrl: 'modules/facultyhomepages/client/views/form-facultyhomepage.client.view.html',
        controller: 'FacultyhomepagesController',
        controllerAs: 'vm',
        resolve: {
          facultyhomepageResolve: newFacultyhomepage
        },
        data: {
          roles: ['user', 'admin','faculty'],
          pageTitle: 'Facultyhomepages Create'
        }
      })
      .state('facultyhomepages.edit', {
        url: '/:facultyhomepageId/edit',
        templateUrl: 'modules/facultyhomepages/client/views/form-facultyhomepage.client.view.html',
        controller: 'FacultyhomepagesController',
        controllerAs: 'vm',
        resolve: {
          facultyhomepageResolve: getFacultyhomepage
        },
        data: {
          roles: ['user', 'admin','faculty'],
          pageTitle: 'Edit Facultyhomepage {{ facultyhomepageResolve.name }}'
        }
      })
      .state('facultyhomepages.viewHome', {
        url: '/:facultyhomepageId',
        templateUrl: 'modules/facultyhomepages/client/views/facultypage.client.view.html',
        controller: 'FacultyhomepagesController',
        controllerAs: 'vm',
        resolve: {
          facultyhomepageResolve: getFacultyhomepage
        },
        data: {
          roles : ['faculty'],
          pageTitle: 'Facultyhomepage {{ facultyhomepageResolve.name }}'
        }
      });
  }

  getFacultyhomepage.$inject = ['$stateParams', 'FacultyhomepagesService'];

  function getFacultyhomepage($stateParams, FacultyhomepagesService) {
    return FacultyhomepagesService.get({
      facultyhomepageId: $stateParams.facultyhomepageId
    }).$promise;
  }

  newFacultyhomepage.$inject = ['FacultyhomepagesService'];

  function newFacultyhomepage(FacultyhomepagesService) {
    return new FacultyhomepagesService();
  }
}());
