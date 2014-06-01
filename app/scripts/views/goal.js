/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utility',
    'fullcalendar',
    'models/user',
    'views/base'
], function ($, _, Backbone, JST, Utility, FullCalendar, UserModel, BaseView) {
    'use strict';

    var GoalView = BaseView.extend({
        client: null,
        events: [],
        initialize: function (options) {
          this.model.messages.on('add', this.addMessage, this);
          this.model.messages.fetch();
          this.client = new UserModel({
            id: this.model.get('accountId')
          });
          this.client.fetch({
            success: function(model, response, options) {
              options.view.render();
            },
            view: this
          });
        },
        template: JST['app/scripts/templates/goal.ejs'],
        render: function () {
          var attributes = this.model.attributes;
          attributes.clientName = this.client.get('firstName') + ' ' + this.client.get('lastName');
          attributes.clientId = this.client.id;
          this.$el.html(this.template(this.model.attributes));
          this.$el.find('.calendar').fullCalendar({
            events: this.events,
            header: {
              left: 'today',
              center: 'title',
              right:  'prev,next'
            }
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
