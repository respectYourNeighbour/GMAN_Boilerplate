/****************************
 ***** Login Controller *****
 ****************************/

(function() {
    'use strict';

    function adminLoginCtrl($scope, $auth, $location, $state, toastr, AuthenticationService) {
        console.log('Admin Login  Controller');

        $scope.login = function() {
        AuthenticationService.login($scope.user)
            .then(function() {
                toastr.success('You have successfully signed in');
                $state.go('admin.profile');
            }).catch(function(response) {
                toastr.error(response.data.message, response.status);
                console.log('response',response);
            });
        };
    }

    angular
        .module('sampleApp')
        .controller('AdminLoginController', ['$scope', '$auth', '$location', '$state', 'toastr', 'AuthenticationService', adminLoginCtrl]);
}());
