'use strict';

angular.module('facultyhomepages').controller('FacultyPageController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }

]);