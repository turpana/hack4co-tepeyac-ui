/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utility',
    'fullcalendar',
    'bootstrap',
    'models/user',
    'models/message',
    'views/base',
    'views/messagemodal'
], function ($, _, Backbone, JST, Utility, FullCalendar, Bootstrap, UserModel,
  MessageModel, BaseView, MessageModalView) {
    'use strict';

    var GoalView = BaseView.extend({
        client: null,
        calendarEvents: [],
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
            error: function(model, response, options) {
              options.view.render();
            },
            view: this
          });
        },
        template: JST['app/scripts/templates/goal.ejs'],
        events: {
          'click .send-message': 'sendMessage',
          'click .post-progress': 'postProgress'
        },
        sendMessage: function () {
          var timestamp = Math.round(+new Date()/1000);
          var message = new MessageModel({
            to: this.client.get('phoneNumber'),
            body: $('#message-body').val(),
            goalId: this.model.id,
            created: timestamp,
            updated: timestamp
          });
          message.save({}, {
            success: function (model, response, options) {
              options.view.model.messages.add(model);
              $('#send-reminder').modal('toggle');
            },
            error: function (model, response, options) {
              $('#send-reminder').modal('toggle');
            },
            view: this
          });
          return false;
        },
        postProgress: function () {
          var timestamp = Math.round(+new Date()/1000);
          var message = new MessageModel({
            // include messageStatus to flag for not sending SMS
            messageStatus: $('#message-status').val(),
            to: this.client.get('phoneNumber'),
            body: this.model.get('textMessage'),
            goalId: this.model.id,
            created: timestamp,
            updated: timestamp
          });
          message.save({}, {
            success: function (model, response, options) {
              $('#post-progress').modal('toggle');
              options.view.model.messages.add(model);
            },
            error: function (model, response, options) {
              $('#post-progress').modal('toggle');
            },
            view: this
          });
          return false;
        },
        render: function () {
          var _this = this;
          var attributes = this.model.attributes;
          attributes.clientName = this.client.get('firstName') + ' ' + this.client.get('lastName');
          attributes.clientId = this.client.id;
          this.$el.html(this.template(this.model.attributes));
          this.calendarEvents = [];
          this.model.messages.each(this.addEvent, this);
          this.$el.find('.calendar').fullCalendar({
            events: this.calendarEvents,
            header: {
              left: 'today',
              center: 'title',
              right:  'prev,next'
            },
            eventClick: function (calEvent, jsEvent, calView) {
              if (_.isNull(calEvent.modalView)) {
                calEvent.modalView = new MessageModalView({
                  model: calEvent.model
                });
                _this.$el.append(calEvent.modalView.render().el);
              }
              calEvent.modalView.$el.find('.modal').modal({ show: true });
            }
          });
          return this;
        },
        addEvent: function (model) {
          this.calendarEvents.push({
            model: model,
            modelId: model.id,
            start: Utility.formatDate(this.model.get('created')),
            title: model.responseStatus(),
            color: model.color(),
            modalView: null
          });
        },
        addMessage: function (model, collection, options) {
          this.render();
        }

    });

    return GoalView;
});
