angular.module('svBeaconApis')
  .factory('Events',
    function ($http, $q, $log,
              Validations, Firebases, EventData, Attendees, Beacons) {
      var Events = {beacons:Beacons, data: EventData, attendees:Attendees},
        isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var path = 'events', deferred;
      var events = function() {
        return Firebases.rootRef().then(function (rootRef) {
          return rootRef.child(path);
        });
      }
      var create = function (event) {
        events().then(function (events) {
          var newRef = events.set(event,function(error) {
            if (error) {
              $log.info("could not be saved.", error);
            } else {
              $log.info("saved successfully.");
            }
          })
          //var key = newRef.key();
          $log.info("newRef ", newRef);
        })
      }
      create(EventData.event);

      Events.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        events().then(function (events) {
          events.on("value", function(snapshot) {
            deferred.resolve(snapshot.val());
          }, function (errorObject) {
            deferred.reject(errorObject);
            console.log("The read failed: " + errorObject.code);
          });
        })

        return deferred.promise;
      }

      return Events;


    })
