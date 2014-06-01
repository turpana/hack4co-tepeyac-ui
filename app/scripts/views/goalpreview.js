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
        initialize: function (options) {
          this.model.messages.on('add', this.render, this);
          this.model.messages.fetch();
        },
        className: 'goal-preview',
        events: {
          'click .goal-detail': 'goalDetail'
        },
        goalDetail: function () {
          this.trigger('navigate', 'goal/'+ this.model.id, {trigger: true});
          return false;
        },
        template: JST['app/scripts/templates/goalpreview.ejs'],
        render: function () {
          var attributes = this.model.attributes;
          // temporarily using the same random state.
          attributes.glyphicon = attributes.status = this.model.getStatus();
          //attributes.status = this.model.getStatus();
          //attributes.glyphicon = this.model.getStatusGlyphIcon();
          this.$el.html(this.template(attributes));
          return this;
        }
    });

    return GoalPreviewView;
});
