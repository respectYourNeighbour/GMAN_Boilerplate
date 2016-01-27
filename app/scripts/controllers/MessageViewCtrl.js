/**********************************
 ***** MessageView Controller *****
 **********************************/

(function() {
    'use strict';

    function msgViewCtrl($scope, toastr, ContactService, message) {
        console.log('MessageView  Controller');
        console.log('message',message);
        $scope.message = message.data;
    }

    angular
        .module('sampleApp')
        .controller('MessageViewController',  ['$scope', 'toastr', 'ContactService', 'message', msgViewCtrl]);

}());