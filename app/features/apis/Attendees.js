angular.module('svBeaconApis')
  .factory('Attendees',
    function ($http, $q, $log,
              Validations, Firebases) {
      var Attendees = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var path = 'signals', deferred;
      var signals = function() {
        return Firebases.rootRef().then(function (rootRef) {
          return rootRef.child(path);
        });
      }

      Attendees.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        signals().then(function (events) {
          deferred.resolve(events);
        }, function (err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }

      return Attendees;


    })
