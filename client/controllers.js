angular.module('myApp.controllers', ['ngRoute', 'ngResource', 'myApp.services'])
    .controller('WelcomeCtrl', ['$scope', '$http', function($scope, $http) {

    }])
    .controller('ListCtrl', ['$scope', '$http','dateDiffService', function($scope, $http, dateDiffService) {
        $scope.chirpText = '';
        $scope.username = '';
        $scope.email = '';

        function refreshUsers() {
            $http({
                url: '/api/users',
                method: 'GET'
            }).then(function successCallback(response) {
                $scope.users = response.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        };


        refreshUsers();

        $scope.createUser = function() {
            let newUser = {
                user: $scope.username,
                email: $scope.email
            };

            $http({
                url: '/api/users',
                method: 'POST',
                data: newUser
            }).then(function SuccessCallback(response) {
                refreshUsers();
                $scope.username = '';
                $scope.email = '';
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        function refreshChirps() {
            $http({
                url: '/api/chirps',
                method: 'GET'
            }).then(function successCallback(response) {
                $scope.chirps = response.data.reverse();
                $scope.chirps.forEach(function(e) {
                    e.timestamp = dateDiffService.dateDiff(e.timestamp);
                });
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        refreshChirps();

        $scope.createChirp = function() {
            let newChirp = {
                message: $scope.chirpText,
                user: $scope.chirpUser.id
            };

            $http({
                url: '/api/chirps',
                method: 'POST',
                data: newChirp
            }).then(function SuccessCallback(response) {
                refreshChirps();
                $scope.chirpText = '';
            });
        };
    }])
    .controller('SingleCtrl', ['$scope', '$http', '$routeParams', '$location', 'dateDiffService', function($scope, $http, $routeParams, $location, dateDiffService) {
        let index = $routeParams.id;

        function getSingleChirp(id) {
            $http({
                url: `/api/chirps/${id}`,
                method: 'GET'
            }).then(function successCallback(response) {
                $scope.singleChirp = response.data[0];
                $scope.singleChirp.timestamp = dateDiffService.dateDiff($scope.singleChirp.timestamp);
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        getSingleChirp(index);

        $scope.deleteChirp = function () {
            $http({
                url: `/api/chirps/${index}`,
                method: 'DELETE'
            }).then(function successCallback(response) {
                $location.url('/chirps');
            });
        };
    }])
    .controller('UpdateCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
        let index = $routeParams.id;

        function getSingleChirp(id) {
            $http({
                url: `/api/chirps/${id}`,
                method: 'GET'
            }).then(function successCallback(response) {
                $scope.singleChirp = response.data[0];
                $scope.updatedMessage = $scope.singleChirp.message;
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        getSingleChirp(index);

        $scope.updateChirp = function() {
            let newChirp = {
                message: $scope.updatedMessage
            }
            $http({
                url: `/api/chirps/${index}`,
                method: 'PATCH',
                data: newChirp
            }).then(function successCallback(response) {
                $location.url('/chirps');
            })
        }
    }])