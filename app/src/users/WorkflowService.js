(function(){
  'use strict';

  angular.module('users')
         .service('workflowService', ['$q', '$fsm', 'questionsService', WorkflowService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function WorkflowService($q, $fsm, questionsService){
    
    var events = [
        { name: 'next',  from: 'start',  to: 'log_in' },
        { name: 'next', from: 'log_in', to: 'pick_school' },
        { name: 'next',  from: 'pick_school', to: 'get_phone' },
        { name: 'next',  from: 'get_phone', to: 'get_question-1' },
        { name: 'next',  from: ['get_question-1'], to: 'finish' },
        // { name: 'next',  from: '*', to: 'start' },
        { name: 'reset',  from: '*', to: 'start' }
    ];

    var fsm = $fsm.create({
      initial: 'start',
      events: events
    });
        
    fsm.onenterpick_school = function (event, from, to, deferred, args) {
        deferred.resolve([fsm.current, fsm.can('next'), 'USC, UCLA']);
    };
    
    fsm.onenterstate = function (event, from, to, deferred, args) {
        if (fsm.current.indexOf('get_question') > -1) {
          return questionsService.loadAll(fsm.current)
              .then(function(questions) {
                return deferred.resolve([fsm.current, fsm.can('next'), questions]);
              })

        } else {
            deferred.resolve([fsm.current, fsm.can('next'), null]);
        }
    }
    
     fsm.onleavepick_school = function (event, from, to, deferred, args) {
         // return false;
     };

    return {
        'next': function (args) {
          var deferred = $q.defer();
          fsm.next(deferred, args);
          return deferred.promise;
        }
    }
  }

})();
