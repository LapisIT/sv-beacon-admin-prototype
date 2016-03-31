'use strict';

/**
 * @ngdoc function
 * @name svBeaconAdminPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the svBeaconAdminPrototypeApp
 */
angular.module('svBeaconAdminPrototypeApp')
  .controller('MainCtrl', function ($log, $scope, Events, Validations) {
    var ctrl = this, isDefined = Validations.isDefined;

    ctrl.create = function() {

    }

    Events.load().then(function (event) {
      $log.info('Events.load() ', event);
      ctrl.event = event;
      return Events.attendees.load();
    }).then(function (attendees) {
      $scope.attendees = ctrl.attendees = attendees;
      // attendees.on("value", function(snapshot) {
      //   //var updated = snapshot.val();
      //   //$log.info('Attendees.load ', snapshot.val())
      //
      //   // angular.forEach(updated, function (attendee) {
      //   //   var location = attendee.beacon,
      //   //     beacon = ctrl.event.beacons[Events.beacons.toKey(location.uuid,location.major,location.minor)];
      //   //   if(!isDefined(beacon.attendees)) {
      //   //     beacon.attendees = [];
      //   //   }
      //   //
      //   //   if(Events.beacons.isImmediate(location.proximity)) {
      //   //     beacon.attendees.push(attendee.user);
      //   //   }
      //   // })
      //
      //
      // }, function (errorObject) {
      //   $log.info("The read failed: " + errorObject.code);
      // });
    })

    $scope.$watch('attendees', function (attendeesNew) {
      $log.info('$scope.$watch ', attendeesNew);
    })



  });
