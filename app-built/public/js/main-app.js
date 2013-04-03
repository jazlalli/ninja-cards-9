define(function (require) {
    'use strict';

    requirejs.config({
        baseUrl: '/js/',
        map:{
            '*':{
                'libs/angular':'../libs/angular',
                'libs/domReady':'../libs/domReady'
            }
        },
        paths: {
            'isotope': '../libs/jquery.isotope'
        },
        shim:{
            '../libs/angular':{ exports:'angular' },
            'isotope':{ exports:'$.fn.isotope' }
        }
    });

    require(['app',
        'bootstrapper',
        'controllers/cardsController',
        'controllers/cardDetailController',
        'directives/cardGridDirective',
        'directives/cardItemDirective',
        'directives/cardFilterDirective',
        'directives/cardDetailsDirective',
        'services/categoryMappingservice',
        'libs/angular'
    ], function (app) {
        console.log('main cards app start');
    });
});