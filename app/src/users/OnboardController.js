(function(){

  angular
       .module('users')
       .controller('onboardController', [
          'workflowService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope',
          OnboardController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function OnboardController( workflowService, $mdSidenav, $mdBottomSheet, $log, $q, $scope) {

    var vm = this;

    $scope.step = 1;

    $scope.nextStep = nextStep;

    $scope.dataCallback = dataCallback;



    ///////////////////////////



    function nextStep() {
      $scope.step++;
    }

    function dataCallback(data) {
      console.log('Collected... ', data);
    }

  }

})();
