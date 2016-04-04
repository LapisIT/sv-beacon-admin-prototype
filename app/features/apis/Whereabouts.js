angular.module('svBeaconApis')
  .factory('Whereabouts',
    function ($http, $q, $log,
              Validations, Beacons) {
      var Whereabouts = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var proximitySequence = [];
      
      proximitySequence.push(Beacons.proximitySignals.immediate);
      proximitySequence.push(Beacons.proximitySignals.near);
      proximitySequence.push(Beacons.proximitySignals.far);
      Whereabouts.proximitySequence = proximitySequence;

      Whereabouts.createConfig = function (proximity, numberOfTimesToDecide) {
        return {proximity:proximity, numberOfTimesToDecide:numberOfTimesToDecide};
      };


      return Whereabouts;


    })
