angular.module('svBeaconApis')
  .factory('UsersVisits',
    function ($http, $q, $log,
              Validations, Firebases, $firebaseArray) {
      var UsersVisits = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var deferred;
      var path = 'user-visits';

      var _userVisits = function(childPath) {
        return Firebases.childRef(path + (isEmpty(childPath)?'':'/' + childPath));
      }

      UsersVisits.load = function (username) {
        deferred = isDefined(deferred)?deferred:$q.defer();
        return _userVisits(username);
      };

      return UsersVisits;


    });
