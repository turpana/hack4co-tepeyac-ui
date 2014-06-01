/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var MessageModel = Backbone.Model.extend({
        defaults: {
          fromNumber: '970-744-4304',
          toNumber: '',
          textMessage: '',
          goalId: '',
          created: '',
          updated: ''
        },
        url: function () {
          if (this.isNew()) {
            return Config.api.host + '/api/message';
          } else {
            return Config.api.host + '/api/message/' + this.id;
          }
        }
    });

    return MessageModel;
});
