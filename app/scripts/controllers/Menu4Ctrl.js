/****************************
 ***** Menu4 Controller *****
 ****************************/

(function() {
    'use strict';

    function menu4Ctrl($scope) {
        console.log('Menu 4  Controller');
        $scope.message = 'hi!'; 
    }

    angular
        .module('sampleApp')
        .controller('Menu4Controller',  ['$scope', menu4Ctrl]);

}());