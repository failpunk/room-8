(function(){
  'use strict';

  angular.module('users')
         .service('workflowService', ['$q', '$fsm', WorkflowService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function WorkflowService($q, $fsm){
    var fsm = $fsm.create({
    initial: 'green',
    events: [
        { name: 'warn',  from: 'green',  to: 'yellow' },
        { name: 'panic', from: 'yellow', to: 'red'    },
        { name: 'calm',  from: 'red',    to: 'yellow' },
        { name: 'clear', from: 'yellow', to: 'green'  }
    ]});

    return fsm;
  }

})();
