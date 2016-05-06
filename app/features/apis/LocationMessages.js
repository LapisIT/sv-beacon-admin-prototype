angular.module('svBeaconApis')
  .factory('LocationMessages',
    function ($http, $q, $log,
              Validations, Beacons, Firebases, LocationMessagesData) {
      var LocationMessages = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var settings = {};

      var path = 'events/location-messages', deferred;
      var _locationMessages = function(childPath) {
        return Firebases.childRef(path + (isEmpty(childPath)?'':'/' + childPath));
      }

      LocationMessages.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        _locationMessages().then(function (LocationMessagesRef) {
          deferred.resolve(LocationMessagesRef);
        }, function (err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }

      function _set(location, msgs, locationMsgs) {
        $log.info('LocationMessages.set  # of locations:', location, msgs);
        locationMsgs[location] = msgs;
        return locationMsgs;

      };

      LocationMessages.set = function (locations) {
        var locationMsgs = {};
        angular.forEach(locations, function (location, locationKey) {
          locationMsgs = _set(locationKey, LocationMessagesData.msgs[locationKey], locationMsgs);
        })
        return _locationMessages().then(function (LocationMessagesRef) {
          return LocationMessagesRef.set(locationMsgs)
        })
      };

      LocationMessages.settings = settings;

      return LocationMessages;


    })

