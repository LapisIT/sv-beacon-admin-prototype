angular.module('svBeaconApis')
  .factory('Attendees',
    function ($http, $q, $log,
              Validations, Firebases, $firebaseObject,
              $firebaseArray) {
      var Attendees = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var path = 'signals', deferred;

      var signals = function() {
        return Firebases.rootRef().then(function (rootRef) {
          return rootRef.child(path);
        });
      }

      Attendees.remove = function() {
        return signals().then(function (signals) {
          signals.remove();
        })
      }
      
      Attendees.remove();

      Attendees.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        signals().then(function (signals) {
          var singalsAsArray = $firebaseArray(signals);

          deferred.resolve(singalsAsArray);
        }, function (err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }

      Attendees.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        signals().then(function (signals) {
          var singalsAsArray = $firebaseArray(signals);

          deferred.resolve(singalsAsArray);
        }, function (err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }

      return Attendees;


    })
