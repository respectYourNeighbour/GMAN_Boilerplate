/******************************
 ***** Profile Controller *****
 ******************************/

(function() {
    'use strict';

    function profileCtrl($scope, HomeService) {
        console.log('Profile  Controller');

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the entries
        $scope.myPromise = HomeService.get()
            .success(function(data) {
                console.dir(data);
        });
    }

    angular
        .module('sampleApp')
        .controller('ProfileController', ['$scope', 'HomeService', profileCtrl]);
}());
