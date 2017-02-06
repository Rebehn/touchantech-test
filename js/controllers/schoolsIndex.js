angular.module('aaronsApp')
  .controller('SchoolsIndexController', SchoolsIndexController);

SchoolsIndexController.$inject = ['School'];
function SchoolsIndexController(School) {
  const schoolsIndex = this;
}
