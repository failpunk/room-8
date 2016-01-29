(function(){
  'use strict';

  angular.module('users')
         .service('questionsService', ['$q', '$http', QuestionsService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function QuestionsService($q, $http){
    
    var loadQuestions = $http.get('questions.json');
   
    return { 
        'load': function (state) {
            return $q.when(loadQuestions).then(function (res) {
                return res.data[state];
            });
        }
    }
  }

})();
