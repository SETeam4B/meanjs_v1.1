(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'FormsListController', 'CoursesService'];

  function FacultyhomepagesListController(FacultyhomepagesService, FormsListController, CoursesService) {
    var vm = this;
    vm.user = FormsListController.query();
    vm.courses = CoursesService.query();
    vm.facultyhomepages = FacultyhomepagesService.query();

  }
}());
