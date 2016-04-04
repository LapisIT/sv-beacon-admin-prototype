'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:SignalLogsCtrl
 * @description
 * # SignalLogsCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('SignalLogsCtrl', function ($log, $scope, Events, Validations) {
    var ctrl = this, isDefined = Validations.isDefined;

    ctrl.eventInfo = function(signal) {
      var beacon = signal.beacon;
      return ctrl.event.beacons[Events.beacons.toKey(beacon.uuid,beacon.major,beacon.minor)]['locationName']
    }


    Events.load().then(function (event) {
      $log.info('Events.load() ', event);
      ctrl.event = event;
      return Events.signals.load();
    }).then(function (signals) {
      ctrl.signals = signals;
    })



  });
