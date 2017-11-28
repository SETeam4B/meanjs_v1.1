/*(function () {
  'use strict';

  describe('Facultyhomepages Route Tests', function () {
    // Initialize global variables
    var $scope,
      FacultyhomepagesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FacultyhomepagesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FacultyhomepagesService = _FacultyhomepagesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('facultyhomepages');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/facultyhomepages');
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
          FacultyhomepagesController,
          mockFacultyhomepage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('facultyhomepages.view');
          $templateCache.put('modules/facultyhomepages/client/views/view-facultyhomepage.client.view.html', '');

          // create mock Facultyhomepage
          mockFacultyhomepage = new FacultyhomepagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Facultyhomepage Name'
          });

          // Initialize Controller
          FacultyhomepagesController = $controller('FacultyhomepagesController as vm', {
            $scope: $scope,
            facultyhomepageResolve: mockFacultyhomepage
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:facultyhomepageId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.facultyhomepageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            facultyhomepageId: 1
          })).toEqual('/facultyhomepages/1');
        }));

        it('should attach an Facultyhomepage to the controller scope', function () {
          expect($scope.vm.facultyhomepage._id).toBe(mockFacultyhomepage._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/facultyhomepages/client/views/view-facultyhomepage.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FacultyhomepagesController,
          mockFacultyhomepage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('facultyhomepages.create');
          $templateCache.put('modules/facultyhomepages/client/views/form-facultyhomepage.client.view.html', '');

          // create mock Facultyhomepage
          mockFacultyhomepage = new FacultyhomepagesService();

          // Initialize Controller
          FacultyhomepagesController = $controller('FacultyhomepagesController as vm', {
            $scope: $scope,
            facultyhomepageResolve: mockFacultyhomepage
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.facultyhomepageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/facultyhomepages/create');
        }));

        it('should attach an Facultyhomepage to the controller scope', function () {
          expect($scope.vm.facultyhomepage._id).toBe(mockFacultyhomepage._id);
          expect($scope.vm.facultyhomepage._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/facultyhomepages/client/views/form-facultyhomepage.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FacultyhomepagesController,
          mockFacultyhomepage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('facultyhomepages.edit');
          $templateCache.put('modules/facultyhomepages/client/views/form-facultyhomepage.client.view.html', '');

          // create mock Facultyhomepage
          mockFacultyhomepage = new FacultyhomepagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Facultyhomepage Name'
          });

          // Initialize Controller
          FacultyhomepagesController = $controller('FacultyhomepagesController as vm', {
            $scope: $scope,
            facultyhomepageResolve: mockFacultyhomepage
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:facultyhomepageId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.facultyhomepageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            facultyhomepageId: 1
          })).toEqual('/facultyhomepages/1/edit');
        }));

        it('should attach an Facultyhomepage to the controller scope', function () {
          expect($scope.vm.facultyhomepage._id).toBe(mockFacultyhomepage._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/facultyhomepages/client/views/form-facultyhomepage.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
*/