'use strict';

angular.module('lasrboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lasrbox', {
        url: '/mybox',
        templateUrl: 'app/lasrbox/lasrbox.html',
        controller: 'LasrboxCtrl'
      })
      .state('init', {
        url: '/mybox/init',
        templateUrl: 'app/lasrbox/init.html',
        controller: 'LasrBoxInitCtrl'
      });
  });
