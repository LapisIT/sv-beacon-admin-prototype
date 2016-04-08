/**
 * @author Parham
 * @since 4/04/2016
 */

angular.module('svBeaconApis').factory('MonitorWhereabouts',
  function ($log, Validations, Firebases, ExitFromLocations) {
    var path = 'whereabouts', isDefined = Validations.isDefined;;
    var whereabouts = function (childPath) {
      return Firebases.childRef(path + (isEmpty(childPath) ? '' : '/' + childPath));
    }

    var inProgress = false,
      lastReceivedAtFromUsers = {};

    var isUserDefined = function (userKey) {
      return isDefined(lastReceivedAtFromUsers[userKey]);
    }
    var initUser = function (userKey) {
      $log.info('initUser ', userKey);
      lastReceivedAtFromUsers[userKey] = {receivedAts: []};
    }
    var addReceivedAt = function (userKey,userEntry) {
      $log.info('addReceivedAt ', userKey, userEntry.receivedAt);
      lastReceivedAtFromUsers[userKey].receivedAts.push(userEntry.receivedAt);
    }


    var monitor = function (whereabouts) {
      var start = new Date();
      $log.info('monitor starting ', start, ' how many locations? ', whereabouts.length);

      whereabouts.forEach(function (location) {
        $log.info('monitor location:  ', location.name);
        angular.forEach(location.users, function (userEntry, userKey) {
          $log.info('monitor user: ', userKey);
          if (!isUserDefined(userKey)) {
            initUser(userKey);
          }
          addReceivedAt(userKey, userEntry);
        })
      })
    }

    var detectAndExits = function (whereabouts) {
      var start = new Date();
      $log.info('detectAndExits starting ', start, ' how many locations? ', whereabouts.length);

      whereabouts.forEach(function (location) {
        $log.info('detectAndExits ', location.name);
        angular.forEach(location.users, function (userEntry, userKey) {
          $log.info('detectAndExits ', userKey);
          if(!isDefined(lastReceivedAtFromUsers[userKey])) {
            $log.info('No lastReceivedAtFromUsers for user ', userKey);
            return;
          }

          var notUpdated = lastReceivedAtFromUsers[userKey].receivedAts.filter(function (receivedAt) {
            $log.info('lastReceivedAtFromUsers filter: ', userEntry.user.name, userEntry.receivedAt, receivedAt);
            return userEntry.receivedAt !== receivedAt;
          }).length === 0;

          $log.info('notUpdated ', notUpdated);
          initUser(userKey);

          if (!notUpdated) {
            $log.info('Still in the location ', userKey, location.name);
            return;
          }
          ExitFromLocations.exit(location, userEntry.user);

        })
      })
      inProgress = false;

    }

    return {
      monitor: monitor,
      detectAndExits:detectAndExits
    }
  });
