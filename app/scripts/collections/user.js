/*global define*/

define([
    'underscore',
    'backbone',
    'config',
    'models/user'
], function (_, Backbone, Config, UserModel) {
    'use strict';

    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: function () {
          return Config.api.host + '/api/user';
        }
    });

    return UserCollection;
});
