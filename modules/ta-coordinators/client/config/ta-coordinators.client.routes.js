(function () {
  'use strict';

  angular
    .module('ta-coordinators')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ta-coordinators', {
        abstract: true,
        url: '/ta-coordinators',
        template: '<ui-view/>'
      })
      .state('ta-coordinators.list', {
        url: '',
        templateUrl: 'modules/ta-coordinators/client/views/list-ta-coordinators.client.view.html',
        controller: 'TaCoordinatorsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ta coordinators List'
        }
      })
      .state('ta-coordinators.create', {
        url: '/create',
        templateUrl: 'modules/ta-coordinators/client/views/form-ta-coordinator.client.view.html',
        controller: 'TaCoordinatorsController',
        controllerAs: 'vm',
        resolve: {
          tacoordinatorResolve: newTaCoordinator
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Ta coordinators Create'
        }
      })
      .state('ta-coordinators.edit', {
        url: '/:taCoordinatorId/edit',
        templateUrl: 'modules/ta-coordinators/client/views/form-ta-coordinator.client.view.html',
        controller: 'TaCoordinatorsController',
        controllerAs: 'vm',
        resolve: {
          tacoordinatorResolve: getTaCoordinator
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ta coordinator {{ ta-coordinatorResolve.name }}'
        }
      })
      .state('ta-coordinators.view', {
        url: '/:taCoordinatorId',
        templateUrl: 'modules/ta-coordinators/client/views/view-ta-coordinator.client.view.html',
        controller: 'TaCoordinatorsController',
        controllerAs: 'vm',
        resolve: {
          tacoordinatorResolve: getTaCoordinator
        },
        data: {
          pageTitle: 'Ta coordinator {{ ta-coordinatorResolve.name }}'
        }
      });
  }

  getTaCoordinator.$inject = ['$stateParams', 'TaCoordinatorsService'];

  function getTaCoordinator($stateParams, TaCoordinatorsService) {
    return TaCoordinatorsService.get({
      taCoordinatorId: $stateParams.taCoordinatorId
    }).$promise;
  }

  newTaCoordinator.$inject = ['TaCoordinatorsService'];

  function newTaCoordinator(TaCoordinatorsService) {
    return new TaCoordinatorsService();
  }
}());
