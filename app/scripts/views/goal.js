/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utility',
    'fullcalendar',
    'views/base'
], function ($, _, Backbone, JST, Utility, FullCalendar, BaseView) {
    'use strict';

    var GoalView = BaseView.extend({
        events: [],
        initialize: function (options) {
          this.model.messages.on('add', this.addMessage, this);
          this.model.messages.fetch();
        },
        template: JST['app/scripts/templates/goal.ejs'],
        render: function () {
          this.$el.html(this.template(this.model.attributes));
          this.$el.find('.calendar').fullCalendar({
            events: this.events
          });
          return this;
        },
        addMessage: function (model, collection, options) {
          this.events.push({
            start: Utility.formatDate(this.model.get('created')),
            title: model.responseStatus(),
            color: model.color()
          });
          this.render();
        }

    });

    return GoalView;
});
