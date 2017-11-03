(function () {
  'use strict';

  angular
    .module('assignmentrecommendations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('assignmentrecommendations', {
        abstract: true,
        url: '/assignmentrecommendations',
        template: '<ui-view/>'
      })
      .state('assignmentrecommendations.list', {
        url: '',
        templateUrl: 'modules/assignmentrecommendations/client/views/list-assignmentrecommendations.client.view.html',
        controller: 'AssignmentrecommendationsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Assignmentrecommendations List'
        }
      })
      .state('assignmentrecommendations.create', {
        url: '/create',
        templateUrl: 'modules/assignmentrecommendations/client/views/form-assignmentrecommendation.client.view.html',
        controller: 'AssignmentrecommendationsController',
        controllerAs: 'vm',
        resolve: {
          assignmentrecommendationResolve: newAssignmentrecommendation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Assignmentrecommendations Create'
        }
      })
      .state('assignmentrecommendations.edit', {
        url: '/:assignmentrecommendationId/edit',
        templateUrl: 'modules/assignmentrecommendations/client/views/form-assignmentrecommendation.client.view.html',
        controller: 'AssignmentrecommendationsController',
        controllerAs: 'vm',
        resolve: {
          assignmentrecommendationResolve: getAssignmentrecommendation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Assignmentrecommendation {{ assignmentrecommendationResolve.name }}'
        }
      })
      .state('assignmentrecommendations.view', {
        url: '/:assignmentrecommendationId',
        templateUrl: 'modules/assignmentrecommendations/client/views/view-assignmentrecommendation.client.view.html',
        controller: 'AssignmentrecommendationsController',
        controllerAs: 'vm',
        resolve: {
          assignmentrecommendationResolve: getAssignmentrecommendation
        },
        data: {
          pageTitle: 'Assignmentrecommendation {{ assignmentrecommendationResolve.name }}'
        }
      });
  }

  getAssignmentrecommendation.$inject = ['$stateParams', 'AssignmentrecommendationsService'];

  function getAssignmentrecommendation($stateParams, AssignmentrecommendationsService) {
    return AssignmentrecommendationsService.get({
      assignmentrecommendationId: $stateParams.assignmentrecommendationId
    }).$promise;
  }

  newAssignmentrecommendation.$inject = ['AssignmentrecommendationsService'];

  function newAssignmentrecommendation(AssignmentrecommendationsService) {
    return new AssignmentrecommendationsService();
  }
}());
