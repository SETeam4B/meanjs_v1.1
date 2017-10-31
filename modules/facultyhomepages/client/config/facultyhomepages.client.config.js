(function () {
  'use strict';

  angular
    .module('facultyhomepages')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Faculty Home',
    //   state: 'facultyhomepages',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'facultyhomepages', {
    //   title: 'List Facultyhomepages',
    //   state: 'facultyhomepages.list'
    // });
  }
}());
