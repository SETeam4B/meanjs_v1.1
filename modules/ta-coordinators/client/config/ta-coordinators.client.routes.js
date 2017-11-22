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
      .state('ta-coordinators.tacandidates', {
        url: '',
        templateUrl: 'modules/ta-coordinators/client/views/tacandidates-ta-coordinators.client.view.html',
        controller: 'TaCoordinatorsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'TA Candidates'
        }
      })
      .state('ta-coordinators.courselist', {
        url: '/courselist',
        templateUrl: 'modules/ta-coordinators/client/views/courselist-ta-coordinator.client.view.html',
        controller: 'TaCoordinatorsController',
        controllerAs: 'vm',
        resolve: {
          tacoordinatorResolve: newTaCoordinator
        },
        data: {
          pageTitle: 'Course List'
        }
      })
      .state('ta-coordinators.status', {
        url: '/ta-coordinators/status',
        templateUrl: 'modules/ta-coordinators/client/views/status-ta-coordinator.client.view.html',
        controller: 'TaCoordinatorsStatusController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ta coordinators Status'
        }
      })
        .state('ta-coordinators.recommendation',{
          url: '/recommendation/:courseId/:courseTitle',
            templateUrl: 'modules/ta-coordinators/client/views/recommendation-ta-coordinator.client.view.html',
            controller: 'RecommendationAssignmentController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Recommendation'
            }
        })
        .state('ta-coordinators.assignment',{
            url: '/assignment/:courseId/:courseTitle',
            templateUrl: 'modules/ta-coordinators/client/views/assignments-ta-coordinator.client.view.html',
            controller: 'AssignmentController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Assignment'
            }
        })
        .state('ta-coordinators.tacoordinatorCourseList',{
            url: '/courseList',
            templateUrl: 'modules/ta-coordinators/client/views/tacoordinator-courselist.client.view.html',
            controller: 'tacoordinatorCourseListController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'CourseList'
            }
        })
        .state('ta-coordinators.facultyCourseList',{
            url: '/courseLists',
            templateUrl: 'modules/ta-coordinators/client/views/faculty-courselist.client.view.html',
            controller: 'facultyCourseListController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'CourseList'
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
