angular.module('HomeCtrl', []).controller('HomeController', function($scope, $log, SuedezaService, $filter) {
    console.log('Home Controller');
    $scope.WelcomeMessage = 'Welcome Home!';  
});



