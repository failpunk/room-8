(function(){

  angular
      .module('users')
      .directive('questionsDirective', [
        '$log', '$q',
        Directive
      ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function Directive($log, $q) {

    var directive = {
      restrict: 'EA',
      templateUrl: '/src/users/view/QuestionsDirective.html',
      scope: true,
      controller: Controller
    };

    return directive;
  }

  Controller.$inject = ['$scope'];

  function Controller($scope) {


  }

})();
