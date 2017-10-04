(function () {
  'use strict';

  angular
    .module('advisorhomepages')
    .controller('AdvisorhomepagesListController', AdvisorhomepagesListController);

  AdvisorhomepagesListController.$inject = ['AdvisorhomepagesService'];

  function AdvisorhomepagesListController(AdvisorhomepagesService) {
    var vm = this;

    vm.advisorhomepages = AdvisorhomepagesService.query();
  }
}());
