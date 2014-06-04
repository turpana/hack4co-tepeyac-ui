/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/usernew'
], function ($, _, Backbone, JST, UserNewView) {
    'use strict';

    var UsereditView = UserNewView.extend({
        template: JST['app/scripts/templates/useredit.ejs']
    });

    return UsereditView;
});
