/*******************************
 ***** Messages Controller *****
 *******************************/

(function() {
    'use strict';

    function messagesCtrl($scope, unreadMessages) {
        console.log('Messages  Controller');
        $scope.message = 'hi!';
        console.log('unreadMessages',unreadMessages);
        $scope.messages = unreadMessages.data;
    }

    angular
        .module('sampleApp')
        .controller('MessagesController',  ['$scope', 'unreadMessages', messagesCtrl]);

}());