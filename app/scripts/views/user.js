/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/goal',
    'views/base',
    'views/goalpreview',
    'views/goalnew'
], function ($, _, Backbone, JST, GoalModel, BaseView, GoalPreviewView, GoalNewView) {
    'use strict';

    var UserView = BaseView.extend({
        goalNewView: null,
        initialize: function (options) {
          this.model.goals.on('add', this.goalFetched, this);
          this.model.goals.fetch();

          this.goalNewView = new GoalNewView({
            model: new GoalModel({
              'accountId': this.model.id
            })
          });
        },
        events: {
          'click .add-goal': 'addGoal'
        },
        addGoal: function () {
        },
        template: JST['app/scripts/templates/user.ejs'],
        render: function () {
          this.$el.html(this.template(this.model.attributes));
          this.$el.append(this.goalNewView.render().el);
          return this;
        },
        goalFetched: function (model, collection, options) {
          var view = new GoalPreviewView({model: model});
          this.$el.find('.goals').append(view.render().el);
        }
    });

    return UserView;
});
