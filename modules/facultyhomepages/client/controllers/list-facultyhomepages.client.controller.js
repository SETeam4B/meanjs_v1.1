(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'username', 'CoursesService'];

  function FacultyhomepagesListController(FacultyhomepagesService, username, CoursesService) {
    var vm = this;
    vm.user = username.query();
    vm.courses = CoursesService.query();
    vm.facultyhomepages = FacultyhomepagesService.query();

  }
}());
