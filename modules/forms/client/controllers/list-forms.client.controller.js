(function () {
  'use strict';

  angular
    .module('forms')
    .controller('FormsListController', FormsListController);

  FormsListController.$inject = ['FormsService'];

  function FormsListController(FormsService) {
    var vm = this;

    vm.forms = FormsService.query();
  }
}());
