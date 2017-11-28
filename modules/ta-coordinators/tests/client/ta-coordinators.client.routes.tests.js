(function () {
  'use strict';

  describe('Ta coordinators Route Tests', function () {
    // Initialize global variables
    var $scope,
      TaCoordinatorsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TaCoordinatorsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TaCoordinatorsService = _TaCoordinatorsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('ta-coordinators');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/ta-coordinators');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          TaCoordinatorsController,
          mockTaCoordinator;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('ta-coordinators.view');
          $templateCache.put('modules/ta-coordinators/client/views/view-ta-coordinator.client.view.html', '');

          // create mock Ta coordinator
          mockTaCoordinator = new TaCoordinatorsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ta coordinator Name'
          });

          // Initialize Controller
          TaCoordinatorsController = $controller('TaCoordinatorsController as vm', {
            $scope: $scope,
            taCoordinatorResolve: mockTaCoordinator
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:taCoordinatorId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.taCoordinatorResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            taCoordinatorId: 1
          })).toEqual('/ta-coordinators/1');
        }));

        it('should attach an Ta coordinator to the controller scope', function () {
          expect($scope.vm.taCoordinator._id).toBe(mockTaCoordinator._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/ta-coordinators/client/views/view-ta-coordinator.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TaCoordinatorsController,
          mockTaCoordinator;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('ta-coordinators.create');
          $templateCache.put('modules/ta-coordinators/client/views/form-ta-coordinator.client.view.html', '');

          // create mock Ta coordinator
          mockTaCoordinator = new TaCoordinatorsService();

          // Initialize Controller
          TaCoordinatorsController = $controller('TaCoordinatorsController as vm', {
            $scope: $scope,
            taCoordinatorResolve: mockTaCoordinator
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.taCoordinatorResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/ta-coordinators/create');
        }));

        it('should attach an Ta coordinator to the controller scope', function () {
          expect($scope.vm.taCoordinator._id).toBe(mockTaCoordinator._id);
          expect($scope.vm.taCoordinator._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/ta-coordinators/client/views/form-ta-coordinator.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TaCoordinatorsController,
          mockTaCoordinator;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('ta-coordinators.edit');
          $templateCache.put('modules/ta-coordinators/client/views/form-ta-coordinator.client.view.html', '');

          // create mock Ta coordinator
          mockTaCoordinator = new TaCoordinatorsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ta coordinator Name'
          });

          // Initialize Controller
          TaCoordinatorsController = $controller('TaCoordinatorsController as vm', {
            $scope: $scope,
            taCoordinatorResolve: mockTaCoordinator
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:taCoordinatorId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.taCoordinatorResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            taCoordinatorId: 1
          })).toEqual('/ta-coordinators/1/edit');
        }));

        it('should attach an Ta coordinator to the controller scope', function () {
          expect($scope.vm.taCoordinator._id).toBe(mockTaCoordinator._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/ta-coordinators/client/views/form-taCoordinator.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
