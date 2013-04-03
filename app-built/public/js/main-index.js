define(function (require) {
	'use strict';

	requirejs.config({
		baseUrl: '/js/'
    });

	require([], function () {
		console.log('index');
	});
});