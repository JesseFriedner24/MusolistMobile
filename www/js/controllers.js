angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})

.controller('AudioController', function($scope, $ionicPlatform) {

    var audio = [{

        id: 1,
        key: 'morning',
        title: "Morning Commute 148",
        track: 'audio/148.m4a',
        date: "2016-10-01",
        url: "https://s3.amazonaws.com/musolist/podcasts-app/shows/show148.json"
    }, {
        id: 2,
        key: 'morn',
        title: "Morning Commute 139",
        track: 'http://s3.amazonaws.com/musolist/podcasts-app/shows/139.mp3',
        date: '2016-09-30'
    }, ];

    $scope.audioTracks = Array.prototype.slice.call(audio, 0);

    $scope.player = {
        key: '' // Holds a last active track
    }

    $ionicPlatform.ready(function() {

        $scope.playTrack = function(track, key) {
            // Preload an audio track before we play it
            window.plugins.NativeAudio.preloadComplex(key, track, 1, 1, 0, function(msg) {
                // If this is not a first playback stop and unload previous audio track
                if ($scope.player.key.length > 0) {
                    window.plugins.NativeAudio.stop($scope.player.key); // Stop audio track
                    window.plugins.NativeAudio.unload($scope.player.key); // Unload audio track
                }

                window.plugins.NativeAudio.play(key); // Play audio track
                $scope.player.key = key; // Set a current audio track so we can close it if needed 
            }, function(msg) {
                console.log('error: ' + msg); // Loading error
            });
        };

        $scope.stopTrack = function() {
            // If this is not a first playback stop and unload previous audio track
            if ($scope.player.key.length > 0) {
                window.plugins.NativeAudio.stop($scope.player.key); // Stop audio track
                window.plugins.NativeAudio.unload($scope.player.key); // Unload audio track
                $scope.player.key = '';
            }
        };
    });
});
