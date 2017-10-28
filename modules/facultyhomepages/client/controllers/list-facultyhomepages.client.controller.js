(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService'];

  function FacultyhomepagesListController(FacultyhomepagesService) {
    var vm = this;

    vm.facultyhomepages = FacultyhomepagesService.query();
  }
}());
