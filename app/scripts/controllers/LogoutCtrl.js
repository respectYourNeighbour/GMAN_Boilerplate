/*****************************
 ***** Logout Controller *****
 *****************************/

(function() {
    'use strict';

    function logoutCtrl($location, toastr, AuthenticationService) {
        console.log('Logout  Controller');

        if (!AuthenticationService.isAuthenticated()) { return; }
        AuthenticationService.logout().then(function() {
            console.log('logout');
            toastr.info('You have been logged out');
            $location.path('/');
        });
    }

    angular
        .module('sampleApp')
        .controller('LogoutController', ['$location', 'toastr', 'AuthenticationService', logoutCtrl]);
}());
