(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'ListFormsService', 'CoursesService'];
//controller that fetched al the user and course for faculty homepage.
  function FacultyhomepagesListController(FacultyhomepagesService, ListFormsService, CoursesService) {
    var vm = this;
    vm.user = ListFormsService.query();
    vm.courses = CoursesService.query();
    vm.facultyhomepages = FacultyhomepagesService.query();
  }
}());
