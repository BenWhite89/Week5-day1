var app = angular.module('myApp', ['ngRoute', 'ngResource', 'myApp.controllers', 'myApp.services', 'myApp.factories']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeCtrl'
        })
        .when('/chirps', {
            templateUrl: 'views/list.html',
            controller: 'ListCtrl'
        })
        .when('/chirps/:id/update', {
            templateUrl: 'views/single_update.html',
            controller: 'UpdateCtrl'
        })
        .when('/chirps/:id', {
            templateUrl: 'views/single_view.html',
            controller: 'SingleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

