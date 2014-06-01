/*global define*/

define([
    'underscore',
    'backbone',
    'config',
    'collections/goal'
], function (_, Backbone, Config, GoalCollection) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        goals: null,
        defaults: {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          created: '',
          updated: ''
        },
        initialize: function () {
          this.goals = new GoalCollection({
            user: this
          });
        },
        url: function() {
          if (this.isNew()) {
            return Config.api.host + '/api/user';
          } else {
            return Config.api.host + '/api/user/' + this.id;
          }
        }
    });

    return UserModel;
});
