(function(){

  angular
      .module('users')
      .directive('stepOneDirective', [
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
      templateUrl: '/src/users/view/StepOneDirective.html',
      scope: true,
      controller: Controller
    };

    return directive;
  }

  Controller.$inject = ['$scope'];

  function Controller($scope) {

    $scope.facebook = facebook;

    function facebook() {
      $scope.dataCallback({id: 1, name: 'Justin', gender: 'male'});
    }
  }

})();
