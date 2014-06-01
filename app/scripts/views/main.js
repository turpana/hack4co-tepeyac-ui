/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/base'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var MainView = BaseView.extend({
        template: JST['app/scripts/templates/body.ejs'],
        className: 'container'
    });

    return MainView;
});
