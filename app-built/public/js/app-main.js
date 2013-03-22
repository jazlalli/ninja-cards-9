define(function (require) {
    'use strict';

    require({
        map:{
            '*':{
                'libs/angular':'../libs/angular',
                'libs/domReady':'../libs/domReady'
            }
        },
        paths: {
            'isotope': '../libs/jquery.isotope',
            'bootstrap': '../libs/bootstrap'
        },
        shim:{
            '../libs/angular':{ exports:'angular' },
            'isotope':{ exports:'$.fn.isotope' },
            'bootstrap':{ exports:'$.fn.carousel' }
        }
    }, ['app',
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
        console.log('app start');
    });
});