/****************************
 ***** Main Controller ******
 ****************************/

(function() {
    'use strict';

    function mainCtrl($scope, $translate, AuthenticationService) {
        console.log('Main Controller');
        $scope.message = 'hi!';

        $scope.changeLanguage = function (langKey) {
            console.log('changeLanguage');
            $translate.use(langKey);
        };
        $scope.isAuthenticated = function() {
          return AuthenticationService.isAuthenticated();
        };
    }

    angular
        .module('sampleApp')
        .controller('MainController',  ['$scope', '$translate', 'AuthenticationService', mainCtrl]);

}());