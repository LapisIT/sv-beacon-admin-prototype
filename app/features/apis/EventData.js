angular.module('svBeaconApis')
  .factory('EventData',
    function ($http, $q, $log,
              Validations, Beacons, ProgramData, LocationData) {
      var EventData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;
      var programs = ProgramData.programs, pidx =0;

      var event = {id:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        name:'GIS Water User Group Meeting ',
        dates:['Friday 13th May 2016'],
        organiser:'Spatial Vision',
        summary:'The objective of GWUG is to assist water authorities to leverage their investment in spatial information and technology to support improved planning and managing of assets.',
        website:'http://spatialvision.com.au/'};

      event.locations = Beacons.asObjects(event.id, LocationData.locations);


      EventData.event = event;
      return EventData;


    })
