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
                                   colour, locationName,
                                   immediate, near, far, unknown) {
        return {beaconName:beaconName,identifier:identifier, major:major, minor:minor,
          colour:colour, locationName:locationName,
          proximity:{immediate:immediate, near:near, far:far, unknown:unknown}}
      }


      var toKey = function (uuid, major, minor) {
        return uuid + ':' + major + ':' + minor;
      }

      var createKey = function (uuid, beacon) {
        return toKey(uuid, beacon.major, beacon.minor);
      }

      var addBeacons = function (event, beacons) {
        var bs = {}
        beacons.forEach(function (beacon, index) {
          beacon.order = index + 1;
          bs[createKey(event, beacon)] = beacon;
        })
        return bs;
      }
      
      Beacons.createBeacon = createBeacon;
      Beacons.toKey = toKey;
      Beacons.createKey = createKey;
      Beacons.addBeacons = addBeacons;
      return Beacons;


    })
