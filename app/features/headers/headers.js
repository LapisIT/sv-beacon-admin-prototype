'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('HeaderCtrl', function ($log, $scope, $location) {
    $log.info('HeaderCtrl...');
    var ctrl = this;
    var create = function (path, label) {
      return {path:path, label:label};
    }
    var paths = [];
    paths.push(create('/', 'Home'));
    paths.push(create('/settings', 'Settings'));
    paths.push(create('/signal-logs', 'Singal logs'));
    ctrl.paths = paths;

    $scope.$on('$routeChangeStart', function(next, current) {
      var path = $location.path();
      ctrl.active = path;

    });


  });
