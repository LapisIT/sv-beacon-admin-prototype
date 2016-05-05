angular.module('svBeaconApis')
  .factory('ExitFromLocations',
    function ($http, $q, $log,
              Validations, Firebases) {
      var ExitFromLocations = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var path = 'whereabouts', deferred;
      var whereabouts = function(childPath) {
        return Firebases.childRef(path + (isEmpty(childPath)?'':'/' + childPath));
      }

      ExitFromLocations.exitAll = function (locations) {
        $log.info('ExitFromLocations.exitAll ', locations);
        if(isEmpty(locations)) {
          $log.error('ExitFromLocations.exitAll location empty... stop processing');
          return;
        }

        locations.forEach(function (location) {
          var path = location.name + '/users/';
          $log.info('ExitFromLocations.exitAll path: ', path);
          exit(path);
        })

      }

      var exit = function (path) {
        $log.info('exit ', path);
        whereabouts(path).then(function (useRef) {
          useRef.remove(function (error) {
            if (error) {
              $log.error("ExitFromLocations, remove from location failed " + path, error);
              return;
            }
            $log.info("ExitFromLocations, removed from location successfully.", path);
          })
        });

      }

      ExitFromLocations.exit = function (locations, userName) {
        $log.info('ExitFromLocations.exit ', locations, userName);
        if(isEmpty(locations) || isEmpty(userName)) {
          $log.error('ExitFromLocations.exit location or user empty... stop processing');
          return;
        }

        locations.forEach(function (location) {
          var path = location.name + '/users/' + userName.replace(/ /g, '');
          $log.info('ExitFromLocations.exit path: ', path);
          exit(path);
        })

      }


      return ExitFromLocations;


    })
