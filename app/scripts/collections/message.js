/*global define*/

define([
    'underscore',
    'backbone',
    'models/message'
], function (_, Backbone, MessageModel) {
    'use strict';

    var MessageCollection = Backbone.Collection.extend({
        model: MessageModel
    });

    return MessageCollection;
});