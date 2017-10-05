(function () {
  'use strict';

  angular
    .module('ta-coordinators')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Ta coordinators',
      state: 'ta-coordinators',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'ta-coordinators', {
      title: 'List Ta coordinators',
      state: 'ta-coordinators.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'ta-coordinators', {
      title: 'Create Ta coordinator',
      state: 'ta-coordinators.create',
      roles: ['user']
    });
  }
}());
