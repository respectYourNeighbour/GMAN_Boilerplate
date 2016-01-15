/****************************
 ***** Main Controller ******
 ****************************/

(function() {
    'use strict';

    function mainCtrl($scope, $translate) {
        console.log('Menu 5  Controller');
        $scope.message = 'hi!'; 

        $scope.changeLanguage = function (langKey) {
            console.log('changeLanguage');
            $translate.use(langKey);
        };
    }

    angular
        .module('sampleApp')
        .controller('MainController',  ['$scope', '$translate', mainCtrl]);

}());