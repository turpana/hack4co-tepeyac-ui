/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utility',
    'views/base'
], function ($, _, Backbone, JST, Utility, BaseView) {
    'use strict';

    var MessageModalView = BaseView.extend({
        template: JST['app/scripts/templates/messagemodal.ejs'],
        render: function () {
          if (_.isUndefined(this.model)) {
            this.$el.html(this.template());
          } else {
            var attributes = this.model.attributes;
            attributes.createdFormatted = Utility.formatDate(this.model.get('created'));
            attributes.responseStatus = this.model.responseStatus();
            this.$el.html(this.template(this.model.attributes));
          }
          return this;
        }
    });

    return MessageModalView;
});
