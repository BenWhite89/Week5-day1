angular.module('myApp.controllers', ['ngRoute', 'ngResource', 'myApp.services', 'myApp.factories'])
    .controller('WelcomeCtrl', ['$scope', '$http', function($scope, $http) {

    }])
    .controller('ListCtrl', ['$scope','dateService', 'Chirps', 'Users', function($scope, dateService, Chirps, Users) {
        $scope.chirpText = '';
        $scope.username = '';
        $scope.email = '';

        $scope.users = Users.query();

        $scope.createUser = function() {
            newUser = new Users({
                user: $scope.username,
                email: $scope.email
            });

            newUser.$save(function(success) {
                $scope.users = Users.query();
                $scope.username = '';
                $scope.email = '';
            });
        };

        function refreshChirps() {
            $scope.chirps = Chirps.query(function(data) {
                data.reverse().forEach(function(e) {
                    e.timestamp = dateService.dateDiff(e.timestamp);
                })
            });
        };

        refreshChirps();

        $scope.createChirp = function() {
            newChirp = new Chirps({
                message: $scope.chirpText,
                user: $scope.chirpUser.id
            });

            newChirp.$save(function(success) {
                refreshChirps();
                $scope.chirpText = '';
            });
        };
    }])
    .controller('SingleCtrl', ['$scope', '$routeParams', '$location', 'dateService', 'Chirps', function($scope, $routeParams, $location, dateService, Chirps) {
        let index = $routeParams.id;

        Chirps.get({id: index}, function(success) {
            $scope.singleChirp = success;
            $scope.singleChirp.timestamp = dateService.dateDiff(success.timestamp);
        });

        $scope.deleteChirp = function() {
            Chirps.delete({id: index}, function() {
                $location.url('/chirps');
            });
        };
    }])
    .controller('UpdateCtrl', ['$scope', '$routeParams', '$location', 'Chirps', function($scope, $routeParams, $location, Chirps) {
        let index = $routeParams.id;

        Chirps.get({ id: index}, function(res) {
            $scope.singleChirp = res;
            $scope.updatedMessage = res.message;
        });

        $scope.updateChirp = function() {
            Chirps.get({ id: index}, function(res) {
                var e = res;
                e.message = $scope.updatedMessage;
                Chirps.update(e);
                $location.url('/chirps');
            })
        }
    }])