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
