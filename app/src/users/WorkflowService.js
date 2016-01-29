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
    
    var build_events = function (questions) {
        var events = [
                { name: 'next',  from: 'start',  to: 'log_in' },
                { name: 'next', from: 'log_in', to: 'pick_school' },
                { name: 'next',  from: 'pick_school', to: 'get_phone' }
            ];
    
        var keys = Object.keys(questions);
        keys.unshift('get_phone');
        console.log('questions', questions, questions.lenth);
        for (var i=0;i<keys.length;i++) {
            var cur = keys[i]
            var next = keys[i+1]
            
            events.push({name:'next', from:cur, to:next});
        }
        
        events.push(
            // { name: 'next',  from: 'get_phone', to: 'get_question-1' },
            // { name: 'next',  from: ['get_question-1'], to: 'get_question-2' },
            { name: 'next',  from: [cur], to: 'finish' },
            // { name: 'next',  from: '*', to: 'start' },
            { name: 'reset',  from: '*', to: 'start' }
        );
        
        return events;
    };   
    
    var init_fsm = function (events) {
        console.log('events', events);
        fsm = $fsm.create({
        initial: 'start',
        events: events
        });
            
        fsm.onenterpick_school = function (event, from, to, deferred, args) {
            deferred.resolve([fsm.current, fsm.can('next'), 'USC, UCLA']);
        };
    
        fsm.onenterstate = function (event, from, to, deferred, args) {
            if (fsm.current.indexOf('get_question') > -1) {
            return questionsService.load(fsm.current)
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
        
        return fsm;
    }; 
    
    var provide_service = function (fsm) {
         fsm.next(deferred, args);
         return deferred.promise;
    };
    
    var fsm = questionsService.loadAll()
        .then(build_events)
        .then(init_fsm);

    return {
            'next': function (args) {
                var deferred = $q.defer();
                return $q.when(fsm).then(function (fsm) {
                    fsm.next(deferred);
                    return deferred.promise;
                });   
            }
        };
    }
})();
