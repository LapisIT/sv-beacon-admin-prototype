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
    'svBeaconAdminPrototypeApp.messages',
    'svBeaconAdminPrototypeApp.validations',
    'uuid4'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'features/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (Firebases) {

  });
