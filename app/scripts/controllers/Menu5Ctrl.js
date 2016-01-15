/****************************
 ***** Menu5 Controller *****
 ****************************/

(function() {
    'use strict';

    function menu5Ctrl($scope) {
        console.log('Menu 5  Controller');
        $scope.message = 'hi!'; 
    }

    angular
        .module('sampleApp')
        .controller('Menu5Controller',  ['$scope', menu5Ctrl]);

}());