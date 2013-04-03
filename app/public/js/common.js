define(function (require) {
	'use strict';

	requirejs.config({
        baseUrl: '/js/',
        paths: {
            'bootstrap': '../libs/bootstrap'
        },
        shim:{
            'bootstrap':{ exports:'$.fn.carousel' }
        }
    });

	require(['bootstrap'], function () {
		console.log('common');
	});
});