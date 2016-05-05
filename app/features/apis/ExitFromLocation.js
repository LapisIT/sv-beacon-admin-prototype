angular.module('svBeaconApis')
  .factory('ExitFromLocations',
    function ($http, $q, $log,
              Validations, Firebases) {
      var ExitFromLocations = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var path = 'whereabouts', deferred;
      var whereabouts = function(childPath) {
        return Firebases.childRef(path + (isEmpty(childPath)?'':'/' + childPath));
      }

      ExitFromLocations.exit = function (locations, user) {
        $log.info('ExitFromLocations.exit ', locations, user);
        if(isEmpty(locations) || isEmpty(user)) {
          $log.error('ExitFromLocations.exit location or user empty... stop processing');
          return;
        }

        locations.forEach(function (location) {
          var path = location.name + '/users/' + user.name.replace(/ /g, '');
          $log.info('ExitFromLocations.exit path: ', path);
          whereabouts(path).then(function (useRef) {
            useRef.remove(function (error) {
              if (error) {
                $log.error("ExitFromLocations, remove from location failed " + locations.locationName, error);
              } else {
                $log.info("ExitFromLocations, removed from location successfully.", locations.locationName);
              }
            })
          });
        })

      }


      return ExitFromLocations;


    })
