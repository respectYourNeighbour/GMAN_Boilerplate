/****************************
 ***** TextEditor Controller *****
 ****************************/

(function() {
    'use strict';

    function textEditorCtrl($scope, TextEditorService) {
        console.log('TextEditor  Controller');
        $scope.message = 'hi!';

        $scope.text = {'text' : 'etc'};

        $scope.save = function() {
	        console.log('text'+ $scope.htmlcontenttwo);
	        TextEditorService.sendText($scope.text).success(function(data) {
	        	console.log('recieve success in ctl'+data);
	        });
	    };

    }

    angular
        .module('sampleApp')
        .controller('TextEditorController',  ['$scope', 'TextEditorService', textEditorCtrl]);

}());