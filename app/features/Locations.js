angular.module('svBeaconAdminPrototypeApp')
  .factory('Locations',
    function ($http, $q, $log,
              Validations, Firebases, uuid4) {
      var Locations = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var deferred;
      var locationPath = 'rooms';

      var rooms = function() {
        return Firebases.rootRef().then(function (rootRef) {
          return rootRef.child(locationPath);
        });
      }

      var create = function (roomNo, beaconId) {
        rooms().then(function (rooms) {
          var newRoomRef = rooms.push({roomNo: roomNo, beaconId: beaconId},function(error) {
            if (error) {
              $log.info("could not be saved.", error);
            } else {
              $log.info("saved successfully.");
            }
          })
          var key = newRoomRef.key();
          $log.info("key ", key);
        })
      }

      Locations.load = function () {
        deferred = isDefined(deferred)?deferred:$q.defer();
        rooms().then(function (rooms) {
          rooms.on("value", function(snapshot) {
            deferred.resolve(snapshot.val());
          }, function (errorObject) {
            deferred.reject(errorObject);
            console.log("The read failed: " + errorObject.code);
          });
        })

        // // Get a database reference to our posts
        // var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
        // // Attach an asynchronous callback to read the data at our posts reference
        // ref.on("value", function(snapshot) {
        //   deferred.resolve(snapshot);
        // }, function (errorObject) {
        //   deferred.reject(errorObject);
        //   console.log("The read failed: " + errorObject.code);
        // });

        return deferred.promise;
      }

      $log.info('Creating a room');
      var roomNo = Math.floor(Math.random() * 100) + 1,beaconId = uuid4.generate();

      create(roomNo, beaconId);

      return Locations;


    })
