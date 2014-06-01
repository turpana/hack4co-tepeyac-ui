/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/base'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var GoalPreviewView = BaseView.extend({
        className: 'goal-preview',
        events: {
          'click .goal-detail': 'goalDetail'
        },
        goalDetail: function () {
          return false;
        },
        template: JST['app/scripts/templates/goalpreview.ejs'],
        render: function () {
          var attributes = this.model.attributes;
          attributes.status = this.model.getStatus();
          this.$el.html(this.template(attributes));
          return this;
        }
    });

    return GoalPreviewView;
});
