/****************************
 ***** Home Controller ******
 ****************************/

(function() {
    'use strict';

    function homeCtrl($scope) {
        console.log('Home Controller');
        $scope.WelcomeMessage = 'Welcome Home!';  
    }

    angular
        .module('sampleApp')
        .controller('HomeController',  ['$scope', homeCtrl]);

}());