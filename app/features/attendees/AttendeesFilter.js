angular.module('svBeaconAdminPrototypeApp')
  .filter('attendeesFilter',
    function ($log, Events) {
      return function (signals) {
        $log.info('attendeesFilter ', signals);
        if(!angular.isArray(signals)) {
          return signals
        }
        signals = signals.sort(function(a, b) {
          return b.receivedAt - a.receivedAt;
        })
        return signals;

        // var unique = [];
        // var filtered  = signals.filter(function (signal) {
        //   var name = signal.user.name,
        //     immediate = Events.beacons.
        //     exists = unique.indexOf(name) > -1;
        //
        //   if(!exists) {
        //     unique.push(name);
        //     return true;
        //   }
        //
        //   return false;
        // })
        //
        // return filtered;
      }

    })
