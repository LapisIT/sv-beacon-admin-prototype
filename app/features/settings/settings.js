'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('SettingsCtrl', function ($log, $scope, Events, Validations, $firebaseArray) {
    var ctrl = this, isDefined = Validations.isDefined;
    ctrl.event = Events.data.event;

    Events.locations.load().then(function (locations) {
      $log.info('Events.locations.load() ', locations);
      ctrl.locations = $firebaseArray(locations);
    })



  });
