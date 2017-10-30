(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'user', 'CoursesService'];

  function FacultyhomepagesListController(FacultyhomepagesService, user, CoursesService) {
    var vm = this;
    vm.user = user.query();
    vm.courses = CoursesService.query();
    vm.facultyhomepages = FacultyhomepagesService.query();

  }
}());
