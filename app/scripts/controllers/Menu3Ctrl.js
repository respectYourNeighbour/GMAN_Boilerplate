/****************************
 ***** Menu3 Controller *****
 ****************************/

(function() {
    'use strict';

    function menu3Ctrl($scope) {
        console.log('Menu 3  Controller');
        $scope.message = 'hi!'; 
    }

    angular
        .module('sampleApp')
        .controller('Menu3Controller',  ['$scope', menu3Ctrl]);

}());