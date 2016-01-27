/*****************************
 ***** Signup Controller *****
 *****************************/

(function() {
    'use strict';

    function signupCtrl($scope, $state, toastr, AuthenticationService) {
        console.log('Signup Controller');

        $scope.signup = function() {
          AuthenticationService.signup($scope.user).then(function(response) {
            console.log('SignUpCtrl function response',response);
            toastr.success('You have successfully signed up');
                AuthenticationService.login($scope.user).then(function(response) {
                    AuthenticationService.setToken(response);
                    toastr.success('You have successfully signed in');
                    $state.go('profile');
                }).catch(function(response) {
                    toastr.error(response.data.message, response.status);
                    console.log('SignUpCtrl response',response);
                });
            }).catch(function(response) {
                toastr.error(response.data.message, response.status);
                console.log('response',response);
            });
        };
    }

    angular
        .module('sampleApp')
        .controller('SignupController', ['$scope', '$state', 'toastr', 'AuthenticationService', signupCtrl]);
}());
