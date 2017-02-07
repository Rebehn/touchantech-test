angular
  .module('myApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router);

//ROUTES
Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: '/templates/landing.html'
    })
    .state('schoolsIndex', {
      url: '/schools',
      templateUrl: '/templates/schoolsIndex.html',
      controller: 'SchoolsIndexController as schoolsIndex'
    })
    .state('schoolsShow', {
      url: '/schools/:id',
      templateUrl: '/templates/schoolsShow.html',
      controller: 'SchoolsShowController as schoolsShow'
    })
    .state('schoolsNew', {
      url: '/school/new',
      templateUrl: '/templates/schoolsNew.html',
      controller: 'SchoolsNewController as schoolsNew'
    })
    .state('membersNew', {
      url: '/members',
      templateUrl: '/templates/membersNew.html',
      controller: 'MembersNewController as membersNew'
    });
  $urlRouterProvider.otherwise('/');
}


//CONTROLLERS
angular.module('myApp')
  .controller('SchoolsIndexController', SchoolsIndexController)
  .controller('SchoolsShowController', SchoolsShowController)
  .controller('SchoolsNewController', SchoolsNewController)
  .controller('MembersNewController', MembersNewController);

SchoolsIndexController.$inject = ['School'];
function SchoolsIndexController(School) {
  const schoolsIndex = this;
  schoolsIndex.all = School.query();
}

SchoolsShowController.$inject = ['School', '$state'];
function SchoolsShowController(School, $state) {
  const schoolsShow = this;
  schoolsShow.school = School.get($state.params);
}

SchoolsNewController.$inject = ['School', '$state'];
function SchoolsNewController(School, $state) {
  const schoolsNew = this;
  schoolsNew.school = {};
  schoolsNew.submit = createSchool;

  function createSchool() {
    School.save(schoolsNew.school);
    $state.go('schoolsIndex');
  }
}

MembersNewController.$inject = ['Member', 'School', '$state'];
function MembersNewController(Member, School, $state){
  const membersNew = this;
  membersNew.allSchools = School.query();
  membersNew.member = {};
  membersNew.member.schools = []; //This is just the id's.
  membersNew.schools = []; //This is the entire object.
  membersNew.submit = createMember;

  membersNew.toggleSelection = toggleSelection;

  function toggleSelection(school) {
    const index = membersNew.schools.indexOf(school);
    if (index > -1) {
      membersNew.schools.splice(index, 1);
      membersNew.member.schools.splice(index, 1);
    } else {
      membersNew.schools.push(school);
      membersNew.member.schools.push(school._id);
    }
  }

  function createMember() {
    Member.save(membersNew.member, (err, res) => {
      for (let i=0; i<membersNew.schools.length; i++) {
        membersNew.schools[i].members.push(res._id);
        membersNew.schools[i].$update();
      }
    });
    $state.go('schoolsIndex');
  }
}

//MODELS
angular.module('myApp')
  .factory('School', School)
  .factory('Member', Member);

School.$inject = ['$resource'];
function School($resource) {
  return new $resource('/schools/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}

Member.$inject = ['$resource'];
function Member($resource) {
  return new $resource('/members/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
