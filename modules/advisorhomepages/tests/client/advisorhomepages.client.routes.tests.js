/*(function () {
  'use strict';

  describe('Advisorhomepages Route Tests', function () {
    // Initialize global variables
    var $scope,
      AdvisorhomepagesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AdvisorhomepagesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AdvisorhomepagesService = _AdvisorhomepagesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('advisorhomepages');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/advisorhomepages');
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
          AdvisorhomepagesController,
          mockAdvisorhomepage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('advisorhomepages.view');
          $templateCache.put('modules/advisorhomepages/client/views/view-advisorhomepage.client.view.html', '');

          // create mock Advisorhomepage
          mockAdvisorhomepage = new AdvisorhomepagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Advisorhomepage Name'
          });

          // Initialize Controller
          AdvisorhomepagesController = $controller('AdvisorhomepagesController as vm', {
            $scope: $scope,
            advisorhomepageResolve: mockAdvisorhomepage
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:advisorhomepageId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.advisorhomepageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            advisorhomepageId: 1
          })).toEqual('/advisorhomepages/1');
        }));

        it('should attach an Advisorhomepage to the controller scope', function () {
          expect($scope.vm.advisorhomepage._id).toBe(mockAdvisorhomepage._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/advisorhomepages/client/views/view-advisorhomepage.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AdvisorhomepagesController,
          mockAdvisorhomepage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('advisorhomepages.create');
          $templateCache.put('modules/advisorhomepages/client/views/course-list.client.view.html', '');

          // create mock Advisorhomepage
          mockAdvisorhomepage = new AdvisorhomepagesService();

          // Initialize Controller
          AdvisorhomepagesController = $controller('AdvisorhomepagesController as vm', {
            $scope: $scope,
            advisorhomepageResolve: mockAdvisorhomepage
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.advisorhomepageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/advisorhomepages/create');
        }));

        it('should attach an Advisorhomepage to the controller scope', function () {
          expect($scope.vm.advisorhomepage._id).toBe(mockAdvisorhomepage._id);
          expect($scope.vm.advisorhomepage._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/advisorhomepages/client/views/course-list.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AdvisorhomepagesController,
          mockAdvisorhomepage;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('advisorhomepages.edit');
          $templateCache.put('modules/advisorhomepages/client/views/course-list.client.view.html', '');

          // create mock Advisorhomepage
          mockAdvisorhomepage = new AdvisorhomepagesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Advisorhomepage Name'
          });

          // Initialize Controller
          AdvisorhomepagesController = $controller('AdvisorhomepagesController as vm', {
            $scope: $scope,
            advisorhomepageResolve: mockAdvisorhomepage
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:advisorhomepageId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.advisorhomepageResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            advisorhomepageId: 1
          })).toEqual('/advisorhomepages/1/edit');
        }));

        it('should attach an Advisorhomepage to the controller scope', function () {
          expect($scope.vm.advisorhomepage._id).toBe(mockAdvisorhomepage._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/advisorhomepages/client/views/course-list.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
*/