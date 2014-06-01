/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/base'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var UserPreviewRowView = BaseView.extend({
        tagName: 'tr',
        events: {
          'click .client-detail': 'clientDetail'
        },
        clientDetail: function () {
          this.trigger('navigate', 'client/' + this.model.id, {trigger:true});
          return false;
        },
        template: JST['app/scripts/templates/userpreviewrow.ejs']
    });

    return UserPreviewRowView;
});
