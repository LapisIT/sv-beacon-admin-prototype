angular.module('svBeaconApis')
  .factory('Firebases',
    function ($http, $q, $log,
              $firebaseObject,
              Validations) {
      var Firebases = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      //https://glowing-inferno-5531.firebaseio.com/
      //https://q8ey5cxtdfh.firebaseio-demo.com/
      var rootRef = new Firebase('https://glowing-inferno-5531.firebaseio.com/');
      var deferred;

      Firebases.rootRef = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();

        deferred.resolve(rootRef);

        return deferred.promise;
      }


      return Firebases;


    })
