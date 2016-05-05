angular.module('svBeaconAdminPrototypeApp')
  .filter('attendeesFilter',
    function ($log, Events) {
      return function (signals) {
        $log.info('attendeesFilter signals ', signals);
        if(!angular.isArray(signals)) {
          return signals
        }
        signals = signals.sort(function(a, b) {
          return b.receivedAt - a.receivedAt;
        })
        
        return signals;

      }

    })
