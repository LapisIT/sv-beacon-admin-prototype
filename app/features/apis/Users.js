angular.module('svBeaconApis')
  .factory('Users',
    function ($http, $q, $log,
              Validations, Firebases, $firebaseArray) {
      var Users = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var deferred;
      var path = 'users';

      var users = function() {
        return Firebases.childRef(path);
      }

      Users.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        users().then(function (users) {
          deferred.resolve($firebaseArray(users));
        })

        return deferred.promise;
      }

      return Users;


    })
