/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/base'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var HeaderView = BaseView.extend({
        template: JST['app/scripts/templates/header.ejs'],
        events: {
          'click a': 'clickA'
        },
        clickA: function (ev) {
          var pathname = ev.currentTarget.pathname.replace(/^\//, '');
          this.trigger('navigate', pathname, {trigger:true});
          return false;
        }
    });

    return HeaderView;
});
