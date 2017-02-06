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
  function createSchool() {
    School.save(schoolsNew.school);
    $state.go('schoolsIndex');
  }

  schoolsNew.submit = createSchool;
}

function MembersNewController(){

}

//MODELS
angular.module('myApp')
  .factory('School', School);

School.$inject = ['$resource'];
function School($resource) {
  return new $resource('/schools/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
