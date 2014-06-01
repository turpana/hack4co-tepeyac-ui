/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'fullcalendar',
    'views/base'
], function ($, _, Backbone, JST, FullCalendar, BaseView) {
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
          var date = new Date(model.get('created') * 1000);
          var year = date.getFullYear();
          var month = new String(1 + date.getMonth());
          if (1 == month.length) month = "0" + month;
          var date = new String(date.getDate());
          if (1 == date.length) date = "0" + date;
          var fullDate = year+'-'+month+'-'+date;
          this.events.push({
            start: fullDate,
            title: model.responseStatus(),
            color: model.color()
          });
          this.render();
        }

    });

    return GoalView;
});
