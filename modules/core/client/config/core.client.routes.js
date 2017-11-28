'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // policy view routing
    $stateProvider
    .state('policy', {
      url: '/policy',
      templateUrl: 'modules/core/client/views/policy.client.view.html',
      data: {
        roles : ['user']
      }
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forms-submit',{
        url: '/submit',
        templateUrl: 'modules/forms/client/views/submit.confirmation.view.html'
    })
    .state('forms-update',{
      url: '/updated',
      templateUrl: 'modules/forms/client/views/update.confirmation.view.html'
});
  }
]);
