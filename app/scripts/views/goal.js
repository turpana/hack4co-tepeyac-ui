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
    'views/base',
    'views/messagemodal'
], function ($, _, Backbone, JST, Utility, FullCalendar, Bootstrap, UserModel,
  BaseView, MessageModalView) {
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
            error: function(model, response, options) {
              options.view.render();
            },
            view: this
          });
        },
        template: JST['app/scripts/templates/goal.ejs'],
        render: function () {
          var _this = this;
          var attributes = this.model.attributes;
          attributes.clientName = this.client.get('firstName') + ' ' + this.client.get('lastName');
          attributes.clientId = this.client.id;
          this.$el.html(this.template(this.model.attributes));
          this.events = [];
          this.model.messages.each(this.addEvent, this);
          this.$el.find('.calendar').fullCalendar({
            events: this.events,
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
          this.events.push({
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
