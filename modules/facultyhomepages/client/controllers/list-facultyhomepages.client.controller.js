(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'Users', 'CoursesService'];

  function FacultyhomepagesListController(FacultyhomepagesService, Users, CoursesService) {
    var vm = this;
    vm.user = Users.query();
    vm.courses = CoursesService.query();
    vm.facultyhomepages = FacultyhomepagesService.query();

  }
}());
