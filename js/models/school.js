angular.module('aaronsApp')
  .factory('School', School);

School.$inject = ['$resource'];
function School($resource) {
  return new $resource('/schools/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
