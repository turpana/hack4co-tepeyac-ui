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
        className: 'goal-new col-sm-6',
        events: {
          'click .add-goal': 'toggleForm',
          'change': 'update'
        },
        toggleForm: function () {
          this.displayForm = !this.displayForm;
          if (this.displayForm) {
            this.showForm();
          }
        },
        showForm: function () {
          var _this = this;
          this.$el.find('.add-goal').fadeOut(
            Config.speed,
            function () {
              _this.$el.find('.form').fadeIn();
            }
          );
          return false;
        },
        update: function () {
          var values = this.$el.serializeArray();
          values.forEach(this.applyToModel, this);
        },
        applyToModel: function (val) {
          switch (val.name) {
          case 'category':
            if (this.model.get('category') != val.value) {
              this.model.set('category', val.value);
              this.render();
            }
            break;
          }
        },
        template: JST['app/scripts/templates/goalnew.ejs'],
        render: function () {
          this.$el.html(this.template(this.model.attributes));
          if (this.displayForm) this.showForm();
          return this;
        }
    });

    return GoalNewView;
});
