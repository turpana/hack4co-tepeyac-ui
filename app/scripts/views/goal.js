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
        initialize: function (options) {
          this.model.messages.on('add', this.addMessage, this);
          this.model.messages.fetch();
        },
        template: JST['app/scripts/templates/goal.ejs'],
        addMessage: function (model, collection, options) {
          console.log(model);
        }

    });

    return GoalView;
});
