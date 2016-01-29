/***********************************
 ***** Text Editor Service *********
 ***********************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('TextEditorService', ['$http', function($http) {

            // each function returns a promise object
            return {
                sendText : function(text) {
                    console.log('text',text);
                    return $http.post('/api/sendText', text);
                }
            };

    }]);

}());