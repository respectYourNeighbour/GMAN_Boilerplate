/****************************
 ***** Content Service *********
 ****************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('ContentService', ['$http', function($http) {

            // each function returns a promise object
            return {
                getPaginationItemCount : function() {
                    console.log('ContentService getPaginationItemCount');
                    return $http.get('/api/getEntries/getItemCount');
                },

                getItems : function(itemsPerPage, pageNumber) {
                    console.log('getItems',pageNumber);
                    return $http.get('/api/getEntries/getItems/' + itemsPerPage + '/' + pageNumber);
                }

            };

    }]);

}());