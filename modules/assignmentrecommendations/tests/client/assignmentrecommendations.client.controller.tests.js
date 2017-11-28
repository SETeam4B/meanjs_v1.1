(function () {
  'use strict';

  describe('Assignmentrecommendations Controller Tests', function () {
    // Initialize global variables
    var AssignmentrecommendationsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      AssignmentrecommendationsService,
      mockAssignmentrecommendation;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _AssignmentrecommendationsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      AssignmentrecommendationsService = _AssignmentrecommendationsService_;

      // create mock Assignmentrecommendation
      mockAssignmentrecommendation = new AssignmentrecommendationsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Assignmentrecommendation Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Assignmentrecommendations controller.
      AssignmentrecommendationsController = $controller('AssignmentrecommendationsController as vm', {
        $scope: $scope,
        assignmentrecommendationResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleAssignmentrecommendationPostData;

      beforeEach(function () {
        // Create a sample Assignmentrecommendation object
        sampleAssignmentrecommendationPostData = new AssignmentrecommendationsService({
          name: 'Assignmentrecommendation Name'
        });

        $scope.vm.assignmentrecommendation = sampleAssignmentrecommendationPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (AssignmentrecommendationsService) {
        // Set POST response
        $httpBackend.expectPOST('api/assignmentrecommendations', sampleAssignmentrecommendationPostData).respond(mockAssignmentrecommendation);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Assignmentrecommendation was created
        expect($state.go).toHaveBeenCalledWith('assignmentrecommendations.view', {
          assignmentrecommendationId: mockAssignmentrecommendation._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/assignmentrecommendations', sampleAssignmentrecommendationPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Assignmentrecommendation in $scope
        $scope.vm.assignmentrecommendation = mockAssignmentrecommendation;
      });

      it('should update a valid Assignmentrecommendation', inject(function (AssignmentrecommendationsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/assignmentrecommendations\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('assignmentrecommendations.view', {
          assignmentrecommendationId: mockAssignmentrecommendation._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (AssignmentrecommendationsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/assignmentrecommendations\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Assignmentrecommendations
        $scope.vm.assignmentrecommendation = mockAssignmentrecommendation;
      });

      it('should delete the Assignmentrecommendation and redirect to Assignmentrecommendations', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/assignmentrecommendations\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('assignmentrecommendations.list');
      });

      it('should should not delete the Assignmentrecommendation and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
