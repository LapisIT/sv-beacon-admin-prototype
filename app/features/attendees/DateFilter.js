angular.module('svBeaconAdminPrototypeApp')
  .filter('toDate',
    function ($log) {
      return function (timeInMil) {
        //$log.info('toDate ', timeInMil);
        if(!angular.isDefined(timeInMil)) {
          return timeInMil;
        }

        return new Date(timeInMil);
      }

    })
