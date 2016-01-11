'use strict';

angular.module('HomeCtrl', []).controller('HomeController', function($scope) {
    console.log('Home Controller');
    $scope.WelcomeMessage = 'Welcome Home!';  
});