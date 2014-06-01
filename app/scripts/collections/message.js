/*global define*/

define([
    'underscore',
    'backbone',
    'config',
    'models/message'
], function (_, Backbone, Config, MessageModel) {
    'use strict';

    var MessageCollection = Backbone.Collection.extend({
        goal: null,
        model: MessageModel,
        initialize: function (options) {
          this.goal = options.goal;
        },
        url: function () {
          return Config.api.host + '/goal/' + this.goal.id + '/message/';
        }
    });

    return MessageCollection;
});
