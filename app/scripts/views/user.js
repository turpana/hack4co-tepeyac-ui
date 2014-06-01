/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utility',
    'models/goal',
    'views/base',
    'views/goalpreview',
    'views/goalnew'
], function ($, _, Backbone, JST, Utility, GoalModel, BaseView, GoalPreviewView, GoalNewView) {
    'use strict';

    var UserView = BaseView.extend({
        goalNewView: null,
        initialize: function (options) {
          this.model.goals.on('add', this.addGoal, this);
          this.model.goals.fetch();
          this.goalNewView = new GoalNewView({
            model: new GoalModel({
              'accountId': this.model.id
            })
          });
          this.goalNewView.on('rerender', this.reRender, this);
        },
        reRender: function () {
          this.model.goals.fetch();
          this.render();
          this.goalNewView = new GoalNewView({
            model: new GoalModel({
              'accountId': this.model.id
            })
          });
          this.goalNewView.on('rerender', this.reRender, this);
        },
        template: JST['app/scripts/templates/user.ejs'],
        render: function () {
          var attributes = this.model.attributes;
          attributes.createdFormated = Utility.formatDate(this.model.get('created'));
          this.$el.html(this.template(this.model.attributes));
          this.model.goals.each(this.addGoal, this);
          this.$el.append(this.goalNewView.render().el);

          return this;
        },
        addGoal: function (model, collection, options) {
          if (!model.isNew()) {
            var view = new GoalPreviewView({model: model});
            view.on('navigate', this.navigate, this);
            this.$el.find('.goals').append(view.render().el);
          }
        }
    });

    return UserView;
});
