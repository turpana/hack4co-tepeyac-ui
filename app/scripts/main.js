/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        fullcalendar: {
            deps: ['jquery']
        }
    },
    paths: {
        fullcalendar: '../bower_components/fullcalendar/fullcalendar',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
    'backbone',
    'routes/app'
], function (Backbone, AppRouter) {
    var router = new AppRouter();
    Backbone.history.start({pushState: true});
});
