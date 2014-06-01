/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/base'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var GoalView = BaseView.extend({
        template: JST['app/scripts/templates/goal.ejs']
    });

    return GoalView;
});
