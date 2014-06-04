/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var BaseView = Backbone.View.extend({
        template: JST['app/scripts/templates/base.ejs'],

        // helper so router can listen to views 'navigate' events
        events: {
          'click .navigate': 'clickNavigate'
        },
        clickNavigate: function (ev) {
          var pathname = ev.currentTarget.pathname.replace(/^\//, '');
          this.trigger('navigate', pathname, {trigger:true});
          return false;
        },
        navigate: function (path, options) {
          this.trigger('navigate', path, options); 
        },

        render: function () {
          if (_.isUndefined(this.model)) {
            this.$el.html(this.template());
          } else {
            this.$el.html(this.template(this.model.attributes));
          }
          return this;
        }
    });

    return BaseView;
});
