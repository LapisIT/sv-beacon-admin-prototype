'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('MainCtrl', function ($log, $scope, Events, Validations,
                                    $firebaseArray, Users) {
    var ctrl = this, isDefined = Validations.isDefined;
    ctrl.event = Events.data.event;
    Users.load().then(function (users) {
        ctrl.users = $firebaseArray(users);
        $log.info('Users.load() ', ctrl.users.length);
        ctrl.users.$loaded().then(function () {
          $log.info('$loaded ', ctrl.users.length);
        });
        return Events.whereabouts.load();
      })
      .then(function (whereabouts) {
        ctrl.whereabouts = $firebaseArray(whereabouts);
        $log.info('Events.whereabouts.load() how many rooms? ', ctrl.whereabouts.length);
        ctrl.whereabouts.$loaded().then(function () {
          $log.info('$loaded ', ctrl.whereabouts.length);
        });
      })


    $scope.count = function (users) {
      var count = 0;
      angular.forEach(users, function () {
        count++;
      })
      return count;
    }


  });
