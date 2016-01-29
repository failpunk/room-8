(function(){

  angular
      .module('users')
      .directive('splashDirective', [
        '$log', '$q',
        Directive
      ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function Directive($log, $q) {

    var directive = {
      restrict: 'EA',
      templateUrl: '/src/users/view/SplashDirective.html',
      scope: true,
      controller: Controller
    };

    return directive;
  }

  Controller.$inject = ['$scope', '$interval'];

  function Controller($scope, $interval) {

    var j= 0, counter = 0;

    $scope.modes = [ ];
    $scope.activated = true;
    $scope.determinateValue = 0;

    // Iterate every 100ms, non-stop
    var cancel = $interval(function() {
      // Increment the Determinate loader
      $scope.determinateValue += 3;
      if ($scope.determinateValue > 100) {
        finishedProcessing();
      }
      // Incrementally start animation the five (5) Indeterminate,
      // themed progress circular bars
      if ( (j < 5) && !$scope.modes[j] && $scope.activated ) {
        $scope.modes[j] = 'indeterminate';
      }
      if ( counter++ % 4 == 0 ) j++;
    }, 100, 0, true);


    function finishedProcessing() {
      $interval.cancel(cancel);
      $scope.goToMatches();
    }

  }

})();
