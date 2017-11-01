angular.module('myApp.factories', ['ngResource'])
    .factory('Chirps', ['$resource', function($resource) {
        return $resource('/api/chirps/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    }])
    .factory('Users', ['$resource', function($resource) {
        return $resource('/api/users/:id', { id: '@id' });
    }])