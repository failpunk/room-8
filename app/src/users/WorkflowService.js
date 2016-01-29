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
            deferred.resolve([fsm.current, fsm.can('next'), 'Alabama State University, Albany State University, American University, Arizona State University, Baylor University, Biola University, Boston College, Brigham Young University, CalPoly San Luis Obispo, Cal Poly Pomona, California State University Bakersfield, California State University Channel Islands, California State University Chico, California State University Dominguez Hills, California State University Fresno, California State University Fullerton, California State University Hayward, California State University Long Beach, California State University Los Angeles, California State University Monterey Bay, California State University Northridge, California State University Sacramento, California State University San Bernadino, California State University San Marcos, California State University Stanislaus, Chapman University, Loyola Marymount University, Massachusetts Institute of Technology, Purdue University, Stanford University, Temple University, Tennessee State University, Tennessee Technological University, Tennessee Temple University, Tennessee Wesleyan College, Texas AM International University, Texas AM University, Texas AM University - Commerce, Texas AM University - Corpus Christi, Texas AM University - Galveston, Texas AM University - Kingsville, Texas AM University - Texarkana, Texas Chiropractic College, Texas Christian University, Texas College, Texas College of Osteopathic Medicine, Texas Lutheran University, Texas Southern University, Texas Tech University, Texas Tech University Health Science Center, Texas Wesleyan University, Texas Womans University, The American College, The Art Institute of Boston, The Art Institutes International Portland, The Art Institutes International San Francisco, The Boston Conservatory, The Catholic University of America, The Chicago School of Professional Psychology, The College of Insurance, The College of New Jersey, The College of Santa Fe, The College of St. Scholastica, The College of Westchester, The College of Wooster, The Cooper Union for the Advancement of Science and Art, The Corcoran College of Art, The Curtis Institute of Music, The Defiance College, The Dickinson School of Law, The Illinois Institute of Art-Chicago, The Johns Hopkins University, The Juilliard School, The Leadership Institute of Seattle, The Maryland Institute College of Art, The Masters College, The McGregor School of Antioch University, The Naropa Institute, The New School, The Rockefeller University, The School of the Art Institute of Chicago, The Scripps Research Institute, The Southern Christian University, The Tulane University of New Orleans, The Union Institute, Thiel College, Thomas A. Edison State College, Thomas Aquinas College, Thomas College Maine, Thomas Jefferson University, Thomas More College, Thomas More College of Liberal Arts, Thomas University, Thunderbird School of Global Management, Tiffin University, Toccoa Falls College, Tomball College, Tougaloo College, Touro College, Touro University, Towson University, Transylvania University, Trevecca Nazarene University, Tri-College University, Trident University, Trinity Bible College, Trinity Christian College, Trinity College Connecticut, Trinity College of Florida, Trinity College of Vermont, Trinity International University, Trinity International University (Excel) Miami, Trinity University, Trinity University, Tri-State University, Triton College, Troy University, Troy University Dothan, Troy University Montgomery, Troy University Phenix City, Troy University Troy, Truman College, Truman State University, Tufts University, Tui Online University, Tusculum College, Tuskegee University, Uniformed Services Universty of the Health Sciences, Union College, Union College Kentucky, Union College Nebraska, Union Theological Seminary (UTS), Union University, United States Air Force Academy, United States Coast Guard Academy, United States International University, United States Merchant Marine Academy, United States Military Academy, United States Naval Academy, United States Sports Academy, Unity College, University of Advancing Technology (UAT), University of Akron, University of Alabama - Birmingham, University of Alabama - Huntsville, University of Alabama - Tuscaloosa, University of Alanta, University of Alaska - Anchorage, University of Alaska - Fairbanks, University of Alaska - Southeast, University of Alaska (System), University of Arizona, University of Arkansas at Fayetteville, University of Arkansas at Little Rock, University of Arkansas at Monticello, University of Arkansas at Pine Bluff, University of Arkansas for Medical Sciences, University of Arkansas (System), University of Baltimore, University of Bridgeport, University of California Berkeley, University of California Davis, University of California Hastings College of Law, University of California Irvine, University of California Los Angeles, University of California Merced, University of California Oakland, University of California Riverside, University of California San Diego, University of California San Francisco, University of California Santa Barbara, University of California Santa Cruz, University of California System, University of Central Arkansas, University of Central Florida, University of Central Missouri, University of Central Oklahoma, University of Central Texas, University of Charleston, University of Charleston South Carolina, University of Chicago, University of Cincinnati, University of Colorado at Boulder, University of Colorado at Colorado Springs, University of Colorado at Denver, University of Colorado Health Sciences Center, University of Connecticut, University of Connecticut at Avery Point, University of Connecticut at Hartford, University of Connecticut at Stamford, University of Connecticut at Waterbury, University of Connecticut Health Center, University of Dallas, University of Dayton, University of Delaware, University of Denver, University of Detroit Mercy, University of Dubuque, University of Evansville, University of Findlay, University of Florida, University of Georgia, University of Great Falls, University of Hartford, University of Hawaii - Hilo, University of Hawaii - Manoa, University Of Hawaii - System, University of Hawaii - West Oahu, University of Health Sciences, University of Houston, University of Houston Clear Lake, University of Houston Downtown, University of Houston Victoria, University of Idaho, University of Illinois, University of Illinois at Chicago, University of Illinois at Springfield, University of Illinois at Urbana-Champaign, University of Indianapolis, University of Iowa, University of Kansas, University of Kentucky, University of La Verne, University of Louisiana at Lafayette, University of Louisiana at Monroe, University of Louisville, University of Maine Augusta, University of Maine Farmington, University of Maine Fort Kent, University of Maine Machias, University of Maine Orono, University of Maine Presque Isle, University of Maine (System), University of Management  Technology, University of Mary, University of Mary Hardin-Baylor, University of Maryland at Baltimore, University of Maryland at College Park, University of Maryland Baltimore County, University of Maryland Eastern Shore, University of Maryland Medicine, University of Maryland (System), University of Maryland University College, University of Massachusetts at Amherst, University of Massachusetts at Boston, University of Massachusetts at Dartmouth, University of Massachusetts at Lowell, University of Massachusetts Medical Center at Worcester, University of Massachusetts (System), University of Medicine and Dentistry of New Jersey, University of Memphis, University of Miami, University of Michigan - Ann Arbor, University of Michigan - Dearborn, University of Michigan - Flint, University of Minnesota - Crookston, University of Minnesota - Duluth, University of Minnesota - Morris, University of Minnesota - Twin Cities Campus, University of Mississippi, University of Mississippi Medical Center, University of Missouri - Columbia, University of Missouri - Kansas City, University of Missouri - Saint Louis, University of Mobile, University of Montana, University of Montana Western, University of Montevallo, University of Nebraska - Kearney, University of Nebraska - Lincoln, University of Nebraska Medical Center, University of Nebraska - Omaha, University of Nebraska (System), University of Nevada - Las Vegas, University of Nevada - Reno, University of New England, University of New England Westbrook College Campus, University of New Hampshire, University of New Hampshire - Manchester, University of New Haven, University of New Mexico, University of New Orleans, University of North Alabama, University of North America, University of South Alabama, University of South Carolina, University of South Carolina - Aiken, University of South Carolina - Beaufort, University of South Carolina - Lancaster, University of South Carolina - Salkehatchie, University of South Carolina - Spartanburg, University of South Carolina - Sumter, University of South Carolina - Union, University of South Dakota, University of Southern California, University of Southern Indiana, University of Southern Maine, University of Southern Mississippi, University of South Florida, University of St. Francis, University of St. Thomas Houston, University of St. Thomas St. Paul, University of Tampa, University of Tennessee - Chattanooga, University of Tennessee - Knoxville, University of Tennessee - Martin, University of Tennessee - Memphis, University of Tennessee Space Institute, University of Texas, University of Wisconsin - Eau Claire, University of Wisconsin - Green Bay, University of Wisconsin - La Crosse, University of Wisconsin - Madison, University of Wisconsin - Milwaukee, University of Wisconsin - Oshkosh, University of Wisconsin - Parkside, University of Wisconsin - Platteville, University of Wisconsin - River Falls, University of Wisconsin - Stevens Point, University of Wisconsin - Stout, University of Wisconsin - Superior, University of Wisconsin - Whitewater, Washington State University']);
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
