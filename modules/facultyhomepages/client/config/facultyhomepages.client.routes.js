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
        resolve : { 
          status : checkAvailability
        },
        data: {
          pageTitle: 'Facultyhomepages List',
          roles : ['faculty']
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
          pageTitle: 'Facultyhomepages Create',
          roles : ['faculty']
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
          pageTitle: 'Edit Facultyhomepage {{ facultyhomepageResolve.name }}',
          roles : ['faculty']
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
          pageTitle: 'Facultyhomepage {{ facultyhomepageResolve.name }}',
          roles : ['faculty']
        }
      }).state('facultyhomepages.unavailable', {
        url: '',
        templateUrl: 'modules/facultyhomepages/client/views/unavailable-facultyhomepages.client.view.html',
        data: {
          pageTitle: 'Facultyhomepages unavailable',
          roles : ['faculty']
        }
      });
  }

  checkAvailability.$inject = ['TaCoordinatorsStatusService'];

  function checkAvailability(TaCoordinatorsStatusService){
    return TaCoordinatorsStatusService.get({}).$promise
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
