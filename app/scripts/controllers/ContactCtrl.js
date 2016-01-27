/******************************
 ***** Contact Controller *****
 ******************************/

(function() {
    'use strict';

    function contactCtrl($scope, toastr, ContactService) {
        console.log('Contact  Controller');
        $scope.success = false;
		$scope.error = false;
		$scope.send = function () {
			console.log('$scope.user.subject',$scope.user.subject);
			console.log('$scope.user.email',$scope.user.email);
			console.log('$scope.user.body',$scope.user.body);
			var message = {
				from: $scope.user.email,
			    date: (new Date().toString()),
			    subject: $scope.user.subject,
			    body: $scope.user.body
			};
			ContactService.sendMessage(message).then(function(data){
				toastr.success('Message sent' + data);
				$scope.user = null;
			});
		};
    }

    angular
        .module('sampleApp')
        .controller('ContactController',  ['$scope', 'toastr', 'ContactService', contactCtrl]);

}());