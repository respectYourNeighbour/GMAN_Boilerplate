'use strict';


/**
 *
 * Main module of the application.
 */
angular
	.module('Admin', [])
	.config(function ($stateProvider, $translateProvider, $urlRouterProvider) {
		function skipIfLoggedIn($q, $auth) {
      		var deferred = $q.defer();
      		if ($auth.isAuthenticated()) {
      			console.log('skipIfLoggedIn');
        		deferred.reject();
      		} else {
        		deferred.resolve();
      		}
      		return deferred.promise;
    	}

	    function loginRequired($q, $location, $auth) {
	      	var deferred = $q.defer();
	      	if ($auth.isAuthenticated()) {
	        	deferred.resolve();
	      	} else {
	      		console.log('loginRequired');
	        	$location.path('/login');
	      	}
	      	return deferred.promise;
	    }

        $stateProvider
	        .state('admin', {
	            abstract: true,
		        url: '/admin',
		        template: '<ui-view/>'
	        })
	        .state('admin.login', {
	            templateUrl: 'views/admin/adminLogin.html',
	            url : '',
	            controller: 'AdminLoginController'
	        })
	        .state('admin.profile', {
	            templateUrl: 'views/admin/adminProfile.html',
	            url : ''
	        });
	        $urlRouterProvider.otherwise('/');
    });