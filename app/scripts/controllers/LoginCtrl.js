/****************************
 ***** Login Controller *****
 ****************************/

(function() {
    'use strict';

    function loginCtrl($scope, $auth, $location, $state, toastr, AuthenticationService) {
        console.log('Login  Controller');

        $scope.login = function() {
        AuthenticationService.login($scope.user)
            .then(function() {
                toastr.success('You have successfully signed in');
                $state.go('profile');
            }).catch(function(response) {
                toastr.error(response.data.message, response.status);
                console.log('response',response);
            });
        };
        $scope.signup = function() {
            AuthenticationService.signup($scope.user)
                .then(function(response) {
                    $auth.setToken(response);
                    $location.path('/');
                    toastr.info('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    toastr.error(response.data.message);
                });
        };
    }

    angular
        .module('sampleApp')
        .controller('LoginController', ['$scope', '$auth', '$location', '$state', 'toastr', 'AuthenticationService', loginCtrl]);
}());
