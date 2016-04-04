angular.module('svBeaconApis')
  .factory('Beacons',
    function ($http, $q, $log,
              Validations) {
      var Beacons = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var proximitySignals = {immediate:'ProximityImmediate',near:'ProximityNear',far:'ProximityFar',unknown:'ProximityUnknown'};

      var isImmediate = function(proximitySignal) {
        return proximitySignal === proximitySignals.immediate;
      }
      Beacons.isImmediate = isImmediate;

      var createBeacon = function (beaconName, identifier, major, minor,
                                   colour, locationName, physicalName) {
        return {beaconName:beaconName,identifier:identifier, major:major, minor:minor,
          colour:colour, locationName:locationName, physicalName:physicalName}
      }


      var toKey = function (uuid, major, minor) {
        return uuid + ':' + major + ':' + minor;
      }

      var createKey = function (uuid, beacon) {
        return toKey(uuid, beacon.major, beacon.minor);
      }

      var asObjects = function (uuid, locations) {
        var obj = {}
        locations.forEach(function (location, index) {
          location.order = index + 1;
          obj[createKey(uuid, location)] = location;
        })
        return obj;
      }

      Beacons.createBeacon = createBeacon;
      Beacons.toKey = toKey;
      Beacons.createKey = createKey;
      Beacons.asObjects = asObjects;


      return Beacons;


    })
