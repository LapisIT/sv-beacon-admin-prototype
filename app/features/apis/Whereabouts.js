angular.module('svBeaconApis')
  .factory('Whereabouts',
    function ($http, $q, $log,
              Validations, Beacons, Firebases, $firebaseArray) {
      var Whereabouts = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var proximitySequence = [];
      proximitySequence.push(Beacons.proximitySignals.immediate);
      proximitySequence.push(Beacons.proximitySignals.near);
      proximitySequence.push(Beacons.proximitySignals.far);
      Whereabouts.proximitySequence = proximitySequence;

      Whereabouts.createConfig = function (proximity, numberOfTimesToDecide) {
        return {proximity:proximity, numberOfTimesToDecide:numberOfTimesToDecide};
      };

      var path = 'whereabouts', deferred;
      var whereabouts = function(childPath) {
        return Firebases.childRef(path + (isEmpty(childPath)?'':'/' + childPath));
      }

      Whereabouts.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        whereabouts().then(function (whereabouts) {
          deferred.resolve(whereabouts);
        }, function (err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }

      Whereabouts.set = function (locations) {
        $log.info('Whereabouts.set  # of locations:', locations.length);
        var whereaboutsNew = {};
        var deferred = $q.defer();
        angular.forEach(locations, function (location) {
          whereaboutsNew[location.locationName] =
          {created:new Date().getTime(), name: location.locationName, order: location.order, colour: location.colour};
        })

        whereabouts().then(function (whereabouts) {
          var newRef = whereabouts.set(whereaboutsNew, function (error) {
            if (error) {
              $log.error("could not be saved.", error);
              deferred.reject(error);
            } else {
              $log.info("saved successfully.");
              deferred.resolve(whereaboutsNew);
            }
          })
        })
        return deferred.promise;
      }

      Whereabouts.exit = function (location, user) {
        var path = location.name + '/users/' + user.name.replace(/ /g, '');
        whereabouts(path).then(function (useRef) {
          useRef.remove(function (error) {
            if (error) {
              $log.error("ExitFromLocations, remove from location failed " + location.locationName, error);
            } else {
              $log.info("ExitFromLocations, removed from location successfully.", location.locationName);
            }
          })
        });
      }


      return Whereabouts;


    })
