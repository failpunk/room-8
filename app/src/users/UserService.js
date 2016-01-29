(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$q', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q){
    var users = [
      {
        name: 'Lia Lugo',
        gender: 'female',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/uxceo/73.jpg',
        has_a_place: true,
        looking_for_a_place: false,
        on_campus: false,
        off_campus: true,
        'get_question_3': 'clean',
        'get_question_2': 'party', 
        'get_question_1': 'morning',
        'roommates_needed': 1, 
        content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.',
        'score': '0.99'
      },
      {
        name: 'George Duke',
        gender: 'male',
        avatar: 'https:\/\/s3.amazonaws.com\/uifaces\/faces\/twitter\/avkashkakdiya\/73.jpg',
        has_a_place: false,
        looking_for_a_place: true,
        on_campus: true,
        off_campus: true,
        'get_question_3': 'clean',
        'get_question_2': 'work',  
        'get_question_1': 'morning',
        'roommates_needed': 1,
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
        , 'score': '0.90'
      },
      {
        name: 'Gener Delosreyes',
        gender: 'female',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/73.jpg',
        has_a_place: false,
        looking_for_a_place: true,
        on_campus: false,
        off_campus: true,
        'get_question_3': 'clean',
        'get_question_2': 'party',
        'roommates_needed': 2,
        'get_question_1': 'night',
        content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
        ,'score': '0.87'
      },
      {
        name: 'Lawrence Ray',
        gender: 'male',
        avatar: 'https:\/\/s3.amazonaws.com\/uifaces\/faces\/twitter\/emieljanson\/73.jpg',
        has_a_place: true,
        looking_for_a_place: false,
        on_campus: false,
        off_campus: true,
        'get_question_3': 'clean',
        'get_question_2': 'work',  
        'roommates_needed': 2,
        'get_question_1': 'night',
        content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
        , 'score': '0.80'
      },
      {
        name: 'Ernesto Urbina',
        gender: 'male',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/myusuf3/73.jpg',
        has_a_place: false,
        looking_for_a_place: true,
        on_campus: true,
        off_campus: true,
        'get_question_3': 'clean',
        'get_question_2': 'party',  
        'roommates_needed': 3,
        'get_question_1': 'morning',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
        , 'score': '0.75'
      },
      {
        name: 'Gani Ferrer',
        gender: 'female',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/pixeliris/73.jpg',
        has_a_place: false,
        looking_for_a_place: true,
        on_campus: true,
        off_campus: true,
        'get_question_3': 'clean',
        'get_question_2': 'work', 
        'roommates_needed': 1, 
        'get_question_1': 'night',
        content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
        , 'score': '0.60'
      }
    ];

    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      }
    };
  }

})();
