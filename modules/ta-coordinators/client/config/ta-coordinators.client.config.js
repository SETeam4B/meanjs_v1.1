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

    // Add the dropdown status item
    menuService.addSubMenuItem('topbar', 'ta-coordinators', {
      title: 'Status',
      state: 'ta-coordinators.status'
    });

    // Add the dropdown TA Candidates item
    menuService.addSubMenuItem('topbar', 'ta-coordinators', {
      title: 'TA Candidates',
      state: 'ta-coordinators.tacandidates'
    });

    // Add the dropdown course list item
    menuService.addSubMenuItem('topbar', 'ta-coordinators', {
      title: 'Course List',
      state: 'ta-coordinators.courselist',
      roles: ['*']
    });

    // Add the dropdown TA Recommend item
    menuService.addSubMenuItem('topbar', 'ta-coordinators', {
      title: 'TA Recommendations',
      state: 'ta-coordinators.tarecommendations',
      roles: ['*']
    });

    // Add the dropdown Assignment item
    menuService.addSubMenuItem('topbar', 'ta-coordinators', {
      title: 'Assignment',
      state: 'ta-coordinators.assignment',
      roles: ['*']
    });

  }
}());
