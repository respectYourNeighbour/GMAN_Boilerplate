/**************************************
 ***** Authentication Service *********
 **************************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('AuthenticationService', ['$auth', function($auth) {

            // each function returns a promise object
            return {

                login : function(user) {
                    return $auth.login(user);
                },

                signup : function(user) {
                    return $auth.signup(user);
                },

                logout : function() {
                    return $auth.logout();
                },

                setToken : function(token) {
                    return $auth.setToken(token);
                },

                isAuthenticated : function() {
                    return $auth.isAuthenticated();
                }
            };
    }]);
}());



