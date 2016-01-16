/****************************
 ***** Menu1 Controller *****
 ****************************/
 
(function() {
    'use strict';

    function menu1Ctrl($scope, HomeService) {
        console.log('Menu 1  Controller');

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
        .controller('Menu1Controller', ['$scope', 'HomeService', menu1Ctrl]);
}());
