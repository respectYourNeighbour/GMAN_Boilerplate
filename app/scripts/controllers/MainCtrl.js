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

        //google analytics
        $scope.$on('$viewContentLoaded', function() {
            $window.ga('send', 'pageview', { page: $location.url() });
        });
    }

    angular
        .module('sampleApp')
        .controller('MainController',  ['$scope', '$translate', 'AuthenticationService', mainCtrl]);

}());