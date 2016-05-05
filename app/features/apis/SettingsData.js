angular.module('svBeaconApis')
  .factory('SettingsData',
    function ($http, $q, $log,
              Validations, Beacons) {
      var SettingsData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var settings = {cleanIntervalInMilliseconds:30000};

      SettingsData.settings = settings;
      return SettingsData;


    })
