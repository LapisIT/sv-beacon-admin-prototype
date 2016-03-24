'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('MainCtrl', function ($log, Events) {
    var ctrl = this;

    ctrl.create = function() {

    }
    Events.load().then(function (event) {
      $log.info('Events.load() ', event);
      ctrl.event = event;
    })


  });
