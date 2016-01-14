'use strict';

angular
	.module('sampleApp')
	.controller('HomeController', function($scope) {
    	console.log('Home Controller');
    	$scope.WelcomeMessage = 'Welcome Home!';  
});