/****************************
 ***** TextEditor Controller *****
 ****************************/

(function() {
    'use strict';

    function textEditorCtrl($scope) {
        console.log('TextEditor  Controller');
        $scope.message = 'hi!';
    }

    angular
        .module('sampleApp')
        .controller('TextEditorController',  ['$scope', textEditorCtrl]);

}());