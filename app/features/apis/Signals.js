angular.module('svBeaconApis')
  .factory('Signals',
    function ($http, $q, $log,
              Validations, Firebases, $firebaseObject,
              $firebaseArray) {
      var Signals = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var path = 'signals', deferred;

      var signals = function() {
        return Firebases.childRef(path);
      }

      Signals.remove = function() {
        return signals().then(function (signals) {
          signals.remove();
        })
      }

      Signals.remove();

      Signals.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        signals().then(function (signals) {
          var singalsAsArray = $firebaseArray(signals);

          deferred.resolve(singalsAsArray);
        }, function (err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }

      return Signals;


    })
