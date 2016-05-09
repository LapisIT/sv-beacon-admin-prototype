angular.module('svBeaconApis')
  .factory('LocationData',
    function ($http, $q, $log,
              Validations, Beacons, Whereabouts) {
      var LocationData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var createBeacon = Beacons.createBeacon;
      var locations = [], index = 0, numberOfTimesToDecide = 15;
      //1
      locations.push(createBeacon('1 mint', 'e208d3f96d73', '28019', '54265',
        '#176D00','Butterfly Value Station',''));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);
      //2
      locations.push(createBeacon('2 blueberry', 'db62f71df1d8', '61912', '63261',
        '#C80101','Water Pump Station',''));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);
      //3
      locations.push(createBeacon('3 mint', 'f613db7a8e0a', '36362', '56186',
        '#B8D4B5','Dissolved Air Flotation Plant',''));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);
      //4
      locations.push(createBeacon('4 blueberry', 'd6390eb6e0c5', '57541', '3766',
        '#54428C','Diaphragm Valves Station',''));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);
      //5
      locations.push(createBeacon('5 ice', 'cffb1b05c7c8', '51144', '6917',
        '#ff6600','Water Filtration & Reverse Osmosis Station',''));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);
      //6
      locations.push(createBeacon('6 ice', 'fc03fce84038', '16440','64744',
        '#85C2E5','Coagulation Filtration System',''));
      locations[index].settings = {};
      locations[index++].settings.whereabouts = Whereabouts.createConfig(Beacons.proximitySignals.near, numberOfTimesToDecide);


      LocationData.locations = locations;


      return LocationData;


    })
