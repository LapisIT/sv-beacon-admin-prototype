angular.module('svBeaconApis')
  .factory('ExitFromLocations',
    function ($http, $q, $log,
              Validations, Firebases) {
      var ExitFromLocations = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var path = 'whereabouts', deferred;
      var whereabouts = function(childPath) {
        return Firebases.childRef(path + (isEmpty(childPath)?'':'/' + childPath));
      }

      ExitFromLocations.exit = function (location, user) {
        $log.info('ExitFromLocations.exit ', location, user);
        if(isEmpty(location) || isEmpty(user)) {
          $log.error('ExitFromLocations.exit location or user empty... stop processing');
          return;
        }
        
        var path = location.name + '/users/' + user.name.replace(/ /g, '');
        whereabouts(path).then(function (useRef) {
          useRef.remove(function (error) {
            if (error) {
              $log.error("ExitFromLocations, remove from location failed " + location.locationName, error);
            } else {
              $log.info("ExitFromLocations, removed from location successfully.", location.locationName);
            }
          })
        });
      }


      return ExitFromLocations;


    })
