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
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'features/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/attendees', {
        templateUrl: 'features/attendees/attendees.html',
        controller: 'AttendeesCtrl',
        controllerAs: 'attendees'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (Firebases) {

  });
