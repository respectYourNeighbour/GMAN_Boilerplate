/****************************
 ***** Menu2 Controller *****
 ****************************/

(function() {
    'use strict';

    function menu2Ctrl($scope) {
        console.log('Menu 2  Controller');
        $scope.message = 'hi!'; 
    }

    angular
        .module('sampleApp')
        .controller('Menu2Controller',  ['$scope', menu2Ctrl]);

}());