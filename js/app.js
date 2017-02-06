angular
  .module('aaronsApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('schoolsIndex', {
      url: '/members',
      templateUrl: '/templates/schoolsindex.html',
      controller: 'SchoolsIndexController as schoolsIndex'
    });
  $urlRouterProvider.otherwise('/');
}
