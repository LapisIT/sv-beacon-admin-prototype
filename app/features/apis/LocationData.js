angular.module('svBeaconApis')
  .factory('LocationData',
    function ($http, $q, $log,
              Validations, Beacons) {
      var LocationData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var createBeacon = Beacons.createBeacon;
      var locations = [];
      locations.push(createBeacon('blueberry', 'd6390eb6e0c5', '57541', '3766',
          '#54428C','Sustain','217 - 120 PAX'));
      locations.push(createBeacon('mint', 'f613db7a8e0a', '36362', '56186',
          '#B8D4B5','Build','218 - 120 PAX'));
      locations.push(createBeacon('ice', 'fc03fce84038', '16440', '64744',
          '#85C2E5','Protect','219 - 252 PAX'));
      locations.push(createBeacon('blueberry', 'db62f71df1d8', '61912', '63261',
          '#C80101','Prosper','220 - 252 PAX'));
      LocationData.locations = locations;

      return LocationData;


    })
