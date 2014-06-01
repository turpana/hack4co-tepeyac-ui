/*global define*/

define([
    'underscore',
    'backbone',
    'config',
    'models/goal'
], function (_, Backbone, Config, GoalModel) {
    'use strict';

    var GoalCollection = Backbone.Collection.extend({
        user: null,
        model: GoalModel,
        initialize: function (options) {
          this.user = options.user;
        },
        url: function () {
          return Config.api.host + '/api/user/' + this.user.id + '/goal/';
        }
    });

    return GoalCollection;
});
