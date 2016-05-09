'use strict';

/**
 * @ngdoc overview
 * @name svBeaconAdminPrototypeApp
 * @description
 * # svBeaconAdminPrototypeApp
 *
 * Main module of the application.
 */
angular
  .module('svBeaconAdminPrototypeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'svBeaconApis',
    'svBeaconAdminPrototypeApp.messages',
    'uuid4',
    'angular.filter',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'features/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/settings', {
        templateUrl: 'features/settings/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/signal-logs', {
        templateUrl: 'features/signal-logs/signal-logs.html',
        controller: 'SignalLogsCtrl',
        controllerAs: 'signalLogs'
      })
      .when('/user-histories', {
        templateUrl: 'features/main/main.html',
        controller: 'UserHistoryCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function () {

  });
