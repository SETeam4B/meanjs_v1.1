(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .controller('FacultyhomepagesListController', FacultyhomepagesListController);

  FacultyhomepagesListController.$inject = ['FacultyhomepagesService', 'Users'];

  function FacultyhomepagesListController(FacultyhomepagesService, Users) {
    var vm = this;
    vm.user = Users.query();

    vm.facultyhomepages = FacultyhomepagesService.query();
  }
}());
