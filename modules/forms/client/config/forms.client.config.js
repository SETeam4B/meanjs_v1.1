(function () {
  'use strict';

  angular
    .module('forms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Forms',
    //   state: 'forms.undergrad',
    //   roles: ['*']
    // });
/*
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'forms', {
      title: 'List Forms',
      state: 'forms.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'forms', {
      title: 'Create Form',
      state: 'forms.create',
        roles: ['*']
    });
    */
  }
}());
