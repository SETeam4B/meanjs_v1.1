'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        //console.log($scope.authentication.user.roles);
        //We need to make it so that roles only contains one value
        if($scope.authentication.user.roles[0] === 'tacoordinator'){
          $state.go('ta-coordinators.status', $state.previous.params);
        }else if($scope.authentication.user.roles[0] === 'faculty'){
          $state.go('ta-coordinators.facultyCourseList', $state.previous.params);
        }else if($scope.authentication.user.roles[0] === 'advisor'){
          $state.go('advisorhomepages.list', $state.previous.params);
        }else if($scope.authentication.user.roles[0] === 'user'){
          //Do some extra work here to route student based on whether
          //or not they have created an account and submitted a form.
          $state.go('policy');
        }else{
          // And redirect to the previous or home page
          $state.go($state.previous.state.name || 'home', $state.previous.params);
        }
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
