'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:UserHistoryCtrl
 * @description
 * # UserHistoryCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('UserHistoryCtrl', function ($log, $scope, Events, Validations,
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


    $scope.toList = function (users) {
      var usersStr = '';
      angular.forEach(users, function (user) {
        usersStr = usersStr + user.name + ', ';
      })
      return usersStr.slice(0, usersStr.length-2);
    }


  });
