define(['require', 'libs/angular', 'app'], function (require, angular) {
	'use strict';
	
	return require(['libs/domReady'], function (document) {
		
		console.log('DOM ready - bootstrap the app!');

		return angular.bootstrap(document, ['app']);
	});
});