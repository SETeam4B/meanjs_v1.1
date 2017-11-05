(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['$state','FacultyhomepagesService', 'ListFormsService', 'status', 'CoursesService'];

  function FacultyhomepagesListController($state, FacultyhomepagesService, ListFormsService, status, CoursesService) {
    var vm = this;

    if(status.faculty){
      vm.user = ListFormsService.query();
      vm.courses = CoursesService.query();
      vm.facultyhomepages = FacultyhomepagesService.query();
    }else{
      $state.go('facultyhomepages.unavailable');
    }

  }
}());
