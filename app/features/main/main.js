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
                                    $firebaseArray, Users, MonitorWhereabouts, UsersVisits) {
    var ctrl = this, isDefined = Validations.isDefined;
    ctrl.event = Events.data.event;
    var cleanIntervalInMilliseconds = Events.settings.cleanIntervalInMilliseconds;
    $log.info('MainCtrl start...', cleanIntervalInMilliseconds);

    $scope.showHistoryDialog = false;

    var stop = $interval(function () {
      $log.info('MainCtrl interval called...');
      MonitorWhereabouts.detectAndExits(ctrl.whereabouts, cleanIntervalInMilliseconds);
    }, cleanIntervalInMilliseconds);

    $scope.$on('$destroy', function () {
      $log.info('MainCtrl $destroy...');
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    });

    Users.load().then(function (users) {
      ctrl.users = $firebaseArray(users);
      $log.info('MainCtrl Users.load() ', ctrl.users.length);
      ctrl.users.$loaded().then(function () {
        $log.info('ctrl.users.$loaded() ', ctrl.users.length);
      });
      return Events.whereabouts.load();
    }).then(function (whereaboutsRef) {
      ctrl.whereabouts = $firebaseArray(whereaboutsRef);

      ctrl.whereabouts.$loaded().then(function () {
        $log.info('MainCtrl ctrl.whereabouts.$loaded() ', ctrl.whereabouts.length);
      });

      whereaboutsRef.on('value', function (snapshot) {
        $log.info('MainCtrl whereaboutsRef.on ctrl.whereabouts', ctrl.whereabouts.length);
        MonitorWhereabouts.monitor(ctrl.whereabouts);
      }, function (errorObject) {
        $log.error("The read failed: " + errorObject.code);
      });
    })

    $scope.count = function (users) {
      var count = 0;
      angular.forEach(users, function () {
        count++;
      });
      return count;
    }

    $scope.toList = function (users) {
      var usersStr = '';
      angular.forEach(users, function (user) {
        usersStr = usersStr + user.name + ', ';
      })
      return usersStr.slice(0, usersStr.length - 2);
    }

    $scope.showHistory = function (user) {
      $scope.selectedUser = '';
      $scope.selectedUserVisits = [];

      UsersVisits.load(user.name).then(function (usersVisits) {
        $firebaseArray(usersVisits).$loaded().then(function (userVisitsArray) {
          userVisitsArray.forEach(function (usersVisit) {
            var userVisitDate = new Date(usersVisit.visited);
            usersVisit.groupBy = (new Date(userVisitDate.getFullYear(), userVisitDate.getMonth(), userVisitDate.getDate(), 0, 0, 0)).getTime();
            $log.info(usersVisit);
          });
          $scope.selectedUser = user;
          $scope.selectedUserVisits = userVisitsArray;
          $scope.showHistoryDialog = true;
        });
      })
    };

    $scope.hideHistory = function () {
      $scope.showHistoryDialog = false;
    }


  }).filter('dateSuffix', function ($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function (input) {
    var dtfilter = $filter('date')(input, 'MMMM dd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter + suffix;
  };
});
