(function () {
  'use strict';

  angular
    // .module('advisorhomepages')
    .module('forms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Advisor Home Page',
    //   state: 'advisorhomepages',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'advisorhomepages', {
    //   title: 'TA Candidates',
    //   state: 'advisorhomepages.list'
    // });

    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'advisorhomepages', {
    //   title: 'Course List',
    //   state: 'advisorhomepages.create',
    //   roles: ['user']
    // });
  }
}());
