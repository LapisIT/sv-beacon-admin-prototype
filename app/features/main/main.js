'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('MainCtrl', function ($log, $scope, $interval, Events, Validations,
                                    $firebaseArray, Users, MonitorWhereabouts) {
    var ctrl = this, isDefined = Validations.isDefined;
    ctrl.event = Events.data.event;
    var cleanIntervalInMilliseconds = 30000;

    var stop = $interval(function () {
      MonitorWhereabouts.detectAndExits(ctrl.whereabouts, cleanIntervalInMilliseconds);
    }, cleanIntervalInMilliseconds);

    $scope.$on('$destroy', function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    });

    Users.load().then(function (users) {
      ctrl.users = $firebaseArray(users);
      $log.info('Users.load() ', ctrl.users.length);
      ctrl.users.$loaded().then(function () {
        $log.info('ctrl.users.$loaded() ', ctrl.users.length);
      });
      return Events.whereabouts.load();
    }).then(function (whereaboutsRef) {
      ctrl.whereabouts = $firebaseArray(whereaboutsRef);

      ctrl.whereabouts.$loaded().then(function () {
        $log.info('ctrl.whereabouts.$loaded() ', ctrl.whereabouts.length);
      });

      whereaboutsRef.on('value', function(snapshot) {
        $log.info('whereaboutsRef.on ctrl.whereabouts', ctrl.whereabouts.length, ctrl.whereabouts[0]);
        MonitorWhereabouts.monitor(ctrl.whereabouts);
      }, function (errorObject) {
        $log.error("The read failed: " + errorObject.code);
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
      return usersStr.slice(0, usersStr.length - 2);
    }


  });
