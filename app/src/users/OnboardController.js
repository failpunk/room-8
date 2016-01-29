(function(){

  angular
       .module('users')
       .controller('onboardController', [
          'workflowService', 'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', '$mdToast',
          OnboardController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function OnboardController( workflowService, userService, $mdSidenav, $mdBottomSheet, $log, $q, $scope, $mdToast) {

    var vm = this;

    vm.onboarding = true;
    $scope.nextStep = nextStep;
    $scope.step = [];

    $scope.dataCallback = dataCallback;
    $scope.isQuestion = isQuestion;
    $scope.goToMatches = goToMatches;

    nextStep();


    // ONBOARDING
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
      vm.onboarding = false;
    }



    // MATCHES
    ///////////////////////////

    vm.selected     = null;
    vm.users        = [ ];
    vm.selectUser   = selectUser;
    vm.toggleList   = toggleUsersList;
    vm.makeContact  = makeContact;
    vm.addFavorite  = addFavorite;

    vm.tabs = [
      { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."}
    ];

    vm.selected = null;
    vm.previous = null;
    vm.nextTab = nextTab;

    function nextTab() {
      title = 'ANother Tab  ';
      view = 'asdflkhas dkofjha lsdkjfhasd ';
      vm.tabs.push({ title: title, content: view, disabled: false});
    };

    // Load all registered users

    userService
        .loadAllUsers()
        .then( function( users ) {
          vm.users    = [].concat(users);
          vm.selected = users[0];
        });


    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      vm.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

      $mdBottomSheet.show({
        controllerAs  : "cp",
        templateUrl   : './src/users/view/contactSheet.html',
        controller    : [ '$mdBottomSheet', ContactSheetController],
        parent        : angular.element(document.getElementById('content'))
      }).then(function(clickedItem) {
        $log.debug( clickedItem.name + ' clicked!');
      });

      /**
       * User ContactSheet controller
       */
      function ContactSheetController( $mdBottomSheet ) {
        this.user = selectedUser;
        this.actions = [
          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.contactUser = function(action) {
          // The actually contact process has not been implemented...
          // so just hide the bottomSheet

          $mdBottomSheet.hide(action);
        };
      }
    }

    function addFavorite(user) {
      vm.favorite = user.name;
      $mdToast.show($mdToast.simple().textContent(user.name + ' added to favorites!'));
    }
  }

})();
