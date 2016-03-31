'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:AttendeesCtrl
 * @description
 * # AttendeesCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('AttendeesCtrl', function ($log, $scope, Events, Validations) {
    var ctrl = this, isDefined = Validations.isDefined;

    ctrl.create = function() {

    }

    Events.load().then(function (event) {
      $log.info('Events.load() ', event);
      ctrl.event = event;
      return Events.attendees.load();
    }).then(function (attendees) {
      ctrl.attendees = attendees;
    })



  });
