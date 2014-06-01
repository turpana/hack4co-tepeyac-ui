/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'config',
    'views/base'
], function ($, _, Backbone, JST, Config, BaseView) {
    'use strict';

    var GoalNewView = BaseView.extend({
        displayForm: false,
        tagName: 'form',
        className: 'goal-new col-sm-12',
        events: {
          'click .add-goal': 'toggleForm',
          'click .close': 'toggleForm',
          'change': 'update',
          'submit': 'submit'
        },
        toggleForm: function () {
          this.displayForm = !this.displayForm;
          if (this.displayForm) {
            this.showForm();
            this.$el.find('.close').show();
          } else {
            this.hideForm();
            this.$el.find('.close').hide();
          }
          return false;
        },
        showForm: function () {
          var _this = this;
          this.$el.find('.add-goal').fadeOut(
            Config.speed,
            function () {
              _this.$el.find('.form').fadeIn(Config.speed);
            }
          );
          return false;
        },
        hideForm: function () {
          var _this = this;
          this.$el.find('.form').fadeOut(
            Config.speed,
            function () {
              _this.$el.find('.add-goal').fadeIn(Config.speed);
            }
          );
        },
        update: function () {
          var values = this.$el.serializeArray();
          values.forEach(this.applyToModel, this);
        },
        applyToModel: function (val) {
          switch (val.name) {
          case 'category-DISABLED':
            if (this.model.get('category') != val.value) {
              this.model.set('category', val.value);
              this.render();
            }
            break;
          case 'category':
          case 'description':
          case 'textMessage':
          case 'likelihood':
            this.model.set(val.name, val.value);
            break;
          }
        },
        template: JST['app/scripts/templates/goalnew.ejs'],
        render: function () {
          this.$el.html(this.template(this.model.attributes));
          if (this.displayForm) this.showForm();
          return this;
        },
        submit: function () {
          var timestamp = Math.round(+new Date()/1000);
          if (this.model.isNew()) {
            this.model.set('created', timestamp);
            this.model.set('updated', timestamp);
          } else {
            this.model.set('updated', timestamp);
          }
          this.model.save({}, {
            success: function (model, response, options) {
              //console.log('success');
              options.view.model.messages.add(model);

            },
            error: function (model, response, options) {
              //console.log('error');
            },
            view: this

          });
          return false;
        }
    });

    return GoalNewView;
});
