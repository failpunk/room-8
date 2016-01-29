(function(){
  'use strict';

  angular.module('users')
         .service('questionsService', ['$q', QuestionsService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function QuestionsService($q){
    
    var questions = {
       'get_question-1': {'text': 'hello world', options: [{'name': 'foo', 'value': 'bar'}]},
        
    };
   
    return { 
        'loadAll': function (state) {
            return $q.when(questions[state]);
        }
    }
  }

})();
