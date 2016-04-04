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
      var whereabouts = function() {
        return Firebases.childRef(path);
      }

      Whereabouts.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        whereabouts().then(function (whereabouts) {
          deferred.resolve($firebaseArray(whereabouts));
        }, function (err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }



      return Whereabouts;


    })
