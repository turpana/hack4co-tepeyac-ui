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

    var UserNewView = BaseView.extend({
        tagName: 'form',
        className: 'row',
        events: {
          'change': 'update',
          'submit': 'submit'
        },
        update: function () {
          var values = this.$el.serializeArray();
          values.forEach(this.applyToModel, this);
        },
        applyToModel: function (val) {
          switch (val.name) {
          case 'phone':
            var phone = val.value.replace('-', '');
            phone = phone.replace('(', '');
            phone = phone.replace(')', '');
            phone = phone.replace(' ', '');
            this.model.set(val.name, phone);
            break;
          default:
            this.model.set(val.name, val.value);
            break;
          }
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
              model.trigger(
                'navigate',
                'client/' + model.id +'/goal/new',
                {trigger:true}
              );
            },
            error: function (model, response, options) {
              console.log(model, response, options);
              if (Config.debug) {
                model.trigger('navigate', 'client/1/goal/new', {trigger:true});
              }
            },
            view: this
          });
          return false;
        },
        template: JST['app/scripts/templates/usernew.ejs']
    });

    return UserNewView;
});
