'use strict';

// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/menu1', {
            templateUrl: 'views/menu1.html',
            controller: 'Menu1Controller'
        })
        .when('/menu2', {
            templateUrl: 'views/menu2.html',
            controller: 'Menu2Controller'
        })
        .when('/menu3', {
            templateUrl: 'views/menu3.html',
            controller: 'Menu3Controller'
        })
        .when('/menu4', {
            templateUrl: 'views/menu4.html',
            controller: 'Menu4Controller'
        })
        .when('/menu5', {
            templateUrl: 'views/menu5.html',
            controller: 'Menu5Controller'
        }).otherwise('/');

    $locationProvider.html5Mode(true);

}]);
