/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/base',
    'collections/user',
    'views/userpreviewrow'
], function ($, _, Backbone, JST, BaseView, UserCollection, UserPreviewRowView) {
    'use strict';

    var UsersView = BaseView.extend({
        users: null,
        initialize: function (options) {
          this.users = new UserCollection();
          this.users.on('add', this.appendModel, this);
          this.users.fetch();
        },
        template: JST['app/scripts/templates/users.ejs'],
        render: function () {
          this.$el.html(this.template());
          this.users.each(this.appendModel, this);
          return this;
        },
        events: {
          'click .add-client': 'addClient'
        },
        addClient: function () {
          this.trigger('navigate', 'client/new', {trigger:true});
        },
        appendModel: function (model, collection, options) {
          var view = new UserPreviewRowView({model:model});
          view.on('navigate', this.navigate, this);
          this.$el.find('tbody').append(view.render().el);
        }
    });

    return UsersView;
});
