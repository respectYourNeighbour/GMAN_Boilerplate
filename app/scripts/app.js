'use strict';


/**
 *
 * Main module of the application.
 */

angular
	.module('sampleApp', [
			'ngRoute', 
			'pascalprecht.translate',
			'ngCookies', 
			'angularUtils.directives.dirPagination'
	])
	.config(function ($routeProvider, $translateProvider) {
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
	        })
	        .otherwise({
                redirectTo: '/'
            });
        //Translations
        $translateProvider

            .useStaticFilesLoader({
                prefix: 'translations/locale-',
                suffix: '.json'
            })
            // tells angular-translate which of the registered languages is the one that should be used by default.
            .preferredLanguage('de')
            .registerAvailableLanguageKeys(['en', 'de', 'fr'], {
                'en_*': 'en',
                'de_*': 'de',
                'fr_*': 'fr'
            })
            // fallback language. If there isn't a translation id in the German translation table, angular-translate will search for it in the English or French translation table, etc.
            .fallbackLanguage(['en','fr'])
            // This method tries to determine by itself what the preferred language would be.
            .determinePreferredLanguage()
            // remember language
            .useLocalStorage();

    });