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
          body: '',
          textMessage: '',
          goalId: '',
          receivedMessage: '',
          created: '',
          updated: '',
          messageStatus: ''
        },
        url: function () {
          if (this.isNew()) {
            return Config.api.host + '/api/message';
          } else {
            return Config.api.host + '/api/message/' + this.id;
          }
        },

        responseStatus: function () {
          if ('' != this.get('messageStatus')) return this.get('messageStatus');
          var receivedMessage = this.get('receivedMessage');
          var messageStatus = 'pending';
          if (receivedMessage == '') return messageStatus;
          var firstChar = receivedMessage.charAt(0);
          switch (firstChar) {
            case '1':
              // reply 1 for yes, green
              messageStatus = 'yes';
              break;
            case '2':
              // reply 2 for no, red
              messageStatus = 'no';
              break;
            case '3':
              // reply 3 for neither
              messageStatus = 'neither';
              break;

            default:
              messageStatus = 'error';
              break;
          }
          return messageStatus;
        },

        color: function () {
          var color;
          switch (this.responseStatus()) {
            case 'yes':
              // reply 1 for yes, green
              color = '#009933';
              break;

            case 'no':
              // reply 2 for no, red
              color = '#a44';
              break;

            case 'neither':
              // reply 3 for neither
              color = '#B2B200';
              break;

            case 'pending':
              color = '#44a';
              break;

            case 'error':
            default:
              // error is red
              color = '#a44';
              break;
          }
          return color;
        }
    });

    return MessageModel;
});
