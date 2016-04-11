angular.module('svBeaconApis')
  .factory('LocationData',
    function ($http, $q, $log,
              Validations, Beacons, Whereabouts) {
      var LocationData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var createBeacon = Beacons.createBeacon;
      var locations = [], index = 0, numberOfTimesToDecide = 8;

      // locations.push(createBeacon('blueberry', 'db62f71df1d8', '61912', '63261',
      //   '#C80101','Prosper','220 - 252 PAX'));
      // locations[index].settings = {};
      // locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);
  //36362 56186
      locations.push(createBeacon('ice', 'fc03fce84038', '36362', '56186',
        '#85C2E5','Conference Area','219 - 252 PAX'));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.far, numberOfTimesToDecide);

      // locations.push(createBeacon('mint', 'f613db7a8e0a', '36362', '56186',
      //   '#B8D4B5','Build','218 - 120 PAX'));
      // locations[index].settings = {};
      // locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);

      // locations.push(createBeacon('blueberry', 'd6390eb6e0c5', '57541', '3766',
      //     '#54428C','Sustain','217 - 120 PAX'));
      // locations[index].settings = {};
      // locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);

      locations.push(createBeacon('mint', 'e208d3f96d73', '28019', '54265',
        '#176D00','SV Booth','TBD'));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.far, numberOfTimesToDecide);

      locations.push(createBeacon('ice', 'cffb1b05c7c8', '51144', '6917',
        '#ff6600','SV Office','TBD'));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.far, numberOfTimesToDecide);

      LocationData.locations = locations;


      return LocationData;


    })
