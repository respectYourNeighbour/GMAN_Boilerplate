/****************************
 ***** Menu1 Controller *****
 ****************************/
 
(function() {
    'use strict';

    function menu1Ctrl($scope, HomeService, $filter) {
        console.log('Menu 1  Controller');

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the entries
        HomeService.get()
            .success(function(data) {
                $scope.enOrd = $filter('filter')(data, { category: 'EN-ORD' });
                $scope.ettOrd = $filter('filter')(data, { category: 'ETT-ORD' });
                $scope.verb = $filter('filter')(data, { category: 'VERB' });
                $scope.verbPastForm = $filter('filter')(data, { category: 'VERB-PAST-FORM' });
                $scope.resor = $filter('filter')(data, { category: 'RESOR' });
                $scope.mat = $filter('filter')(data, { category: 'MAT' });
                $scope.medicin = $filter('filter')(data, { category: 'MEDICIN' });

                console.dir($scope.enOrd);
        });
    }

    angular
        .module('sampleApp')
        .controller('Menu1Controller', ['$scope', 'HomeService', '$filter', menu1Ctrl]);
}());
