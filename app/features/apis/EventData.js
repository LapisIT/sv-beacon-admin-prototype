angular.module('svBeaconApis')
  .factory('EventData',
    function ($http, $q, $log,
              Validations, Beacons, ProgramData) {
      var EventData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var programs = ProgramData.programs, pidx =0;

      var createPresenterSummary = function (programs) {
        return programs.map(function (program) {
            return program.presenter
          }).join('; ')
      }
      var event = {id:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
        name:'SV Tech Talk 26 March',
        organiser:'Imran Qazi',
        summary:'SV Tech Talk provides a series presentations about the latest technology used at SV.',
        presenters: createPresenterSummary(programs),
        website:'http://svwiki.spatialvision.com.au/confluence/display/AppServices/2016/03/21/sv-beacon-prototype+user+API+using+firebase'};

      var createBeacon = Beacons.createBeacon;
      var createKey = Beacons.createKey;

      var createFarSummary = function (programs) {
        return 'SV Tech Talk presenters '+programs.map(function (program) {
            return program.presenter
          }).join('; ')+' visit the website for more info http://svwiki.spatialvision.com.au/confluence/display/AppServices/2016/03/21/sv-beacon-prototype+user+API+using+firebase'
      }

      var createNearSummary = function (program) {
        return program.presenter + ' is presenting...';
      }

      var createImmediateSummary = function (program) {
        return program.presenter + ' is presenting...';
      }

      var beacons = [];
      beacons.push(
        createBeacon('blueberry', 'd6390eb6e0c5', '57541', '3766',
          '#54428C','Van Dimen\'s Land',
          'Immediate info',createNearSummary(programs[pidx++]),createFarSummary(programs), 'Unknown info'));
      beacons.push(
        createBeacon('mint', 'f613db7a8e0a', '36362', '56186',
          '#B8D4B5','Torresia',
          'Immediate info',createNearSummary(programs[pidx++]),createFarSummary(programs), 'Unknown info'));
      beacons.push(
        createBeacon('ice', 'fc03fce84038', '16440', '64744',
          '#85C2E5','Reception',
          'Immediate info',createNearSummary(programs[pidx++]),createFarSummary(programs), 'Unknown info'));
      beacons.push(
        createBeacon('blueberry', 'db62f71df1d8', '61912', '63261',
          '#54428C','Dumperia',
          'Immediate info',createNearSummary(programs[pidx++]),createFarSummary(programs), 'Unknown info'));
      beacons.push(
        createBeacon('mint', 'e208d3f96d73', '28019', '54265',
          '#B8D4B5','Carpentaria',
          'Immediate info',createNearSummary(programs[pidx++]),createFarSummary(programs), 'Unknown info'));
      beacons.push(
        createBeacon('ice', 'cffb1b05c7c8', '51144', '6917',
          '#85C2E5','Victoria',
          'Immediate info',createNearSummary(programs[pidx++]),createFarSummary(programs), 'Unknown info'));

      beacons.forEach(function (beacon, idx) {
        beacon.program = programs[idx];
      })

      event.beacons = Beacons.addBeacons(event.id, beacons);
      EventData.event = event;
      return EventData;


    })
