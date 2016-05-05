angular.module('svBeaconApis')
  .factory('Events',
    function ($http, $q, $log,
              Validations, Firebases, EventData, Beacons,
              Locations, Signals, Whereabouts, SettingsData) {
      var Events = {beacons:Beacons, data: EventData,
        settings:SettingsData.settings,
        locations:Locations, signals:Signals, whereabouts:Whereabouts},
        isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var path = 'events', deferred;
      var events = function() {
        return Firebases.childRef(path);
      }

      var set = function (event) {
        var deferred = $q.defer();
        events().then(function (events) {
          var newRef = events.set(event,function(error) {
            if (error) {
              $log.info("could not be saved.", error);
              deferred.reject(error);
            } else {
              $log.info("saved successfully.");
              deferred.resolve(Events.load());
            }
          })
          $log.info("set newRef ", newRef);
        })

        return deferred.promise;
      }

      Events.set = function (event) {
        return set(event);
      };

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
