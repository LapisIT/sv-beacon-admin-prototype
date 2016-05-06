'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('SettingsCtrl', function ($log, $scope, Events, Validations, Messages, LocationMessages, $firebaseArray) {
    var ctrl = this, isDefined = Validations.isDefined;
    ctrl.event = Events.data.event;
    ctrl.summary = Messages.initMessages('summary');

    Events.locations.load().then(function (locations) {
      $log.info('Events.locations.load() ', locations);
      ctrl.locations = $firebaseArray(locations);
    });

    ctrl.update = function (event) {
      Events.set(event).then(function (saved) {
        return Events.whereabouts.set(event.locations);
      }).then(function () {
        return LocationMessages.set(event.locations);
      }).then(function () {
        ctrl.summary = Messages.createInfo('Saved successfully.');
      })
    }

  });
