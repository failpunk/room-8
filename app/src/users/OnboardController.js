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

    $scope.nextStep = nextStep;

    $scope.dataCallback = dataCallback;
    $scope.isQuestion = isQuestion;
    $scope.goToMatches = goToMatches;

    nextStep();


    ///////////////////////////


    function nextStep() {
      workflowService.next()
          .then(handleNextStep)
          .catch(fail)
    }

    function dataCallback(data) {
      console.log('Collected... ', data);
      nextStep();
    }

    function handleNextStep(params) {
      console.log(params);
      $scope.step = params[0];
      $scope.stepData = params[2];
    }

    function fail() {
      console.log('oasdfkjhsd');
    }

    function isQuestion() {
      return $scope.step.indexOf('question') > -1;
    }

    function goToMatches() {
      console.log('GO TO MATCHES!');
    }

  }

})();
