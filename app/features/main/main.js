'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('MainCtrl', function ($log, Locations) {
    var ctrl = this;
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    ctrl.create = function() {

    }
    Locations.load().then(function (rooms) {
      $log.info('Rooms.load() ', rooms);
      ctrl.rooms = rooms;
    })


  });
