angular.module('svBeaconApis')
  .factory('LocationMessagesData',
    function ($http, $q, $log,
              Validations) {
      var LocationMessagesData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var createMsg = function (msg) {
        return {welcome: msg};
      }

      LocationMessagesData.msgs  = {
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:28019:54265':createMsg('You are at Butterfly Valve Station. Please read OH&S instructions.'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:36362:56186':createMsg('Dissolved Air Flotation Plant. Please read OH&S instructions.'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:57541:3766':createMsg('You are at Diaphragm Valves Station. Please read OH&S instructions.'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:61912:63261':createMsg('You are at Water Pump Station. Please read OH&S instructions.'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:51144:6917':createMsg('You are at Water Filtration & Reverse Osmosis Station. Please read OH&S instructions.'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:16440:64744':createMsg('You are at Coagulation Filtration System. Please read OH&S instructions.')
      };


      return LocationMessagesData;


    })
