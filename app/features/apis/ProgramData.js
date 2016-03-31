angular.module('svBeaconApis')
  .factory('ProgramData',
    function ($http, $q, $log,
              Validations, Beacons) {
      var ProgramData = {}, isDefined = Validations.isDefined, isEmpty = Validations.isEmpty;

      var createProgram = function (presenter) {
        return {presenter:presenter};
      }

      var programs = [];
      programs.push(createProgram('Martin (G), Graeme'));
      programs.push(createProgram('Farrell, Stephen'));
      programs.push(createProgram('Feng, Priscilla'));
      programs.push(createProgram('Heskins, John'));
      programs.push(createProgram('Cockerton, Glenn'));
      programs.push(createProgram('Miller, Ian'));


      ProgramData.programs = programs;
      return ProgramData;


    })
