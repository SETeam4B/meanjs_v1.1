(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'ListFormsService', 'status', 'CoursesService'];

  function FacultyhomepagesListController(FacultyhomepagesService, ListFormsService, status, CoursesService) {
    var vm = this;

    if(status.faculty){
      vm.user = ListFormsService.query();
      vm.courses = CoursesService.query();
      vm.facultyhomepages = FacultyhomepagesService.query();
    }else{
      
    }

  }
}());
