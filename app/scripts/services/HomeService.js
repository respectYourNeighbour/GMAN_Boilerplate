/****************************
 ***** Home Service *********
 ****************************/

(function() {
    'use strict';

    angular
        .module('sampleApp')
        .factory('HomeService', ['$http', function($http) {

            // each function returns a promise object 
            return {
                // call to get all entries
                get : function() {
                    return $http.get('/api/getEntries');
                },

                // call to POST and create a new entry
                create : function(newEntry) {
                    return $http.post('/api/PostNewEntry', newEntry).success(function(data){
                        console.log('this is the new entry that was inserted in DB and now comes back from the API in the Service: ', data[0]);
                        return data[0];
                    });
                },

                // call to DELETE a entry
                del : function(id) {
                    return $http.put('/api/deletePost', {_id: id}).success(function(data) {
                        console.log('successfuly deleted: '+data);
                    });
                },

                // call to EDIT by ID a entry
                update : function(obj) {
                    return $http.put('/api/editPost', {obj:obj}).success(function(data) {
                        console.log('successfuly editted: '+data);
                    });
                }

            };       

    }]);

}());