/**
 * @author Parham
 * @since 4/04/2016
 */

angular.module('svBeaconApis').factory('MonitorWhereabouts',
  function ($log, Validations, Firebases, ExitFromLocations) {
    var path = 'whereabouts', isDefined = Validations.isDefined;
    var whereabouts = function (childPath) {
      return Firebases.childRef(path + (isEmpty(childPath) ? '' : '/' + childPath));
    }

    var lastReceivedAtFromUsers = {};

    var isUserDefined = function (userKey) {
      return isDefined(lastReceivedAtFromUsers[userKey]);
    }

    var initLastKnownUserLocation = function (userKey) {
      $log.info('initUser ', userKey);
      lastReceivedAtFromUsers[userKey] = {receivedAts: [], location:{}, user:{}};
    }

    var addReceivedAt = function (userKey,userEntry,location) {
      $log.info('addReceivedAt ', userKey, userEntry.receivedAt);
      lastReceivedAtFromUsers[userKey].receivedAts.push(userEntry.receivedAt);
      lastReceivedAtFromUsers[userKey].location = location;
      lastReceivedAtFromUsers[userKey].user = userEntry.user;
    }

    var monitor = function (whereabouts) {
      var start = new Date();
      $log.info('monitor starting ', start, ' how many locations? ', whereabouts.length);

      whereabouts.forEach(function (location) {
        $log.info('monitor location:  ', location.name);
        angular.forEach(location.users, function (userEntry, userKey) {
          $log.info('monitor user: ', userKey);
          if (!isUserDefined(userKey)) {
            initLastKnownUserLocation(userKey);
          }
          addReceivedAt(userKey, userEntry,location);
        })
      })
    }

    var isTimeNotElapsed = function(timeElapsedInMilliseconds, cleanIntervalInMilliseconds) {
      return (timeElapsedInMilliseconds < cleanIntervalInMilliseconds);
    }

    var areTwoSignalsSentInInterval = function (receivedAts) {
      return receivedAts.length > 1;
    }

    var detectAndExits = function (whereabouts, cleanIntervalInMilliseconds) {
      var now =  new Date(),
        nowInMilliseconds = now.getTime();
      $log.info('detectAndExits starting ', now, nowInMilliseconds, ' cleanIntervalInMilliseconds ', cleanIntervalInMilliseconds);

      angular.forEach(lastReceivedAtFromUsers, function (lastReceivedAtFromUser, userKey) {
        var receivedAts =  lastReceivedAtFromUser.receivedAts,
          numberOfSignals = receivedAts.length,
          oldestSignal = lastReceivedAtFromUser.receivedAts[0],
          timeElapsedInMilliseconds = nowInMilliseconds - oldestSignal;

        $log.info('detectAndExits Checking user: ', userKey, ' numberOfSignals: ', numberOfSignals,
          ' oldestSignal: ', oldestSignal, ' timeElapsedInMilliseconds: ', timeElapsedInMilliseconds);

        if(isTimeNotElapsed(timeElapsedInMilliseconds, cleanIntervalInMilliseconds)) {
          $log.info('detectAndExits Within the interval, await until the time elapsed.');
          return;
        }

        if(!areTwoSignalsSentInInterval(receivedAts)) {
          var location = lastReceivedAtFromUser.location, user = lastReceivedAtFromUser.user;
          $log.info('detectAndExits Only one signal sent in the interval.', location.name, ' ', user.name);
          ExitFromLocations.exit(whereabouts.locations, lastReceivedAtFromUser.user);
          initLastKnownUserLocation(userKey);
          return;
        }

        $log.info('detectAndExits Assuming ', userKey, ' is still in ', lastReceivedAtFromUser.location.name);
        initLastKnownUserLocation(userKey);

      })

      // whereabouts.forEach(function (location) {
      //   $log.info('detectAndExits checking location: ', location.name);
      //   angular.forEach(location.users, function (userEntry, userKey) {
      //     $log.info('detectAndExits checking user: ', userKey);
      //
      //     if(!isDefined(lastReceivedAtFromUsers[userKey])) {
      //       $log.info('No lastReceivedAtFromUsers for user ', userKey);
      //       return;
      //     }
      //
      //     var notUpdated = lastReceivedAtFromUsers[userKey].receivedAts.filter(function (receivedAt) {
      //       $log.info('lastReceivedAtFromUsers filter: ', userEntry.user.name, userEntry.receivedAt, receivedAt);
      //       return userEntry.receivedAt !== receivedAt;
      //     }).length === 0;
      //
      //     $log.info('notUpdated ', notUpdated);
      //     initUser(userKey);
      //
      //     if (!notUpdated) {
      //       $log.info('Still in the location ', userKey, location.name);
      //       return;
      //     }
      //     ExitFromLocations.exit(location, userEntry.user);
      //
      //   })
      // })

    }

    return {
      monitor: monitor,
      detectAndExits:detectAndExits
    }
  });
