(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'User', 'CoursesService'];

  function FacultyhomepagesListController(FacultyhomepagesService, User, CoursesService) {
    var vm = this;
    vm.user = User.query();
    vm.courses = CoursesService.query();
    vm.facultyhomepages = FacultyhomepagesService.query();

  }
}());
