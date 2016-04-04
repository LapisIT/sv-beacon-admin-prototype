angular.module('svBeaconApis')
  .factory('EventData',
    function ($http, $q, $log,
              Validations, Beacons, ProgramData, LocationData) {
      var EventData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var programs = ProgramData.programs, pidx =0;

      var event = {id:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        name:'Locate16 Conference',
        dates:['2016-04-12','2016-04-13','2016-04-14'],
        organiser:'Locate Conferences Australia Pty Ltd',
        summary:'The Locate Conference (Locate16) is the national conference of the spatial and surveying industries of Australia and New Zealand. The event is an initiative of the Surveying & Spatial Sciences Institute (SSSI), Spatial Industries Business Association (SIBA) and Geospatial Information & Technology Association (GITA) and will be held 12-14 April 2016 at the Melbourne Convention and Exhibition Centre.',
        website:'http://locateconference.com/'};

      event.locations = Beacons.asObjects(event.id, LocationData.locations);


      EventData.event = event;
      return EventData;


    })
