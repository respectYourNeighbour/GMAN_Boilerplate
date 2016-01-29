/*******************************
 ***** Contact Service *********
 *******************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('ContactService', ['$http', function($http) {

            // each function returns a promise object
            return {
                // call to get all entries
                sendMessage : function(message) {
                    return $http.post('/api/newMessage', message);
                },

                getUnreadMessages : function() {
                    return $http.get('/api/unreadMessages');
                },

                getNumberOfUnreadMessages : function() {
                    return $http.get('/api/numberOfUnreadMessages');
                },

                getMessage : function(id) {
                    console.log('getMessage',id);
                    return $http.get('/api/message/' + id);
                }


            };

    }]);

}());