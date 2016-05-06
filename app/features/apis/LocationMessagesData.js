angular.module('svBeaconApis')
  .factory('LocationMessagesData',
    function ($http, $q, $log,
              Validations) {
      var LocationMessagesData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var createMsg = function (msg) {
        return {welcome: msg};
      }

      LocationMessagesData.msgs  = {
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:28019:54265':createMsg('G\' Day Mate'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:36362:56186':createMsg('G\' Day Mate'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:57541:3766':createMsg('G\' Day Mate'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:61912:63261':createMsg('G\' Day Mate'),
        'B9407F30-F5F8-466E-AFF9-25556B57FE6D:51144:6917':createMsg('G\' Day Mate')
      };


      return LocationMessagesData;


    })
