/*global define*/

define([
    'jquery',
    'backbone',
    'config',
    'models/user',
    'models/goal',
    'views/main',
    'views/usernew',
    'views/user'
], function ($, Backbone, Config, UserModel, GoalModel, MainView, UserNewView, UserView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        mainView: null,
        currentView: null,
        client: null,
        initialize: function (options) {
          this.mainView = new MainView({
            el: $('#main')
          });
        },
        transition: function (view) {
          view.$el.hide();
          if (null != this.currentView) {
            var _this = this;
            this.currentView.$el.fadeOut(
              this.animationSpeed,
              function () {
                _this.currentView.remove();
                _this.currentView = view;
                _this.mainView.$el.append(view.el);
                view.render();
                view.$el.fadeIn(_this.animationSpeed);
              }
            );
          } else {
            this.currentView = view;
            this.mainView.$el.append(view.el);
            view.render().$el.fadeIn(this.animationSpeed);
          }
        },
        routes: {
          '': 'clientNew',
          'client/new': 'clientNew',
          'client/:id': 'clientView'
        },
        clientNew: function () {
          this.client = new UserModel();
          this.client.on('navigate', this.navigate, this);
          this.transition(new UserNewView({
            model: this.client
          }));
        },
        clientView: function(id) {
          if (_.isNull(this.client)) {
            this.client = new UserModel({
              id: id
            });
            this.client.fetch({
              success: function (model, response, options) {
                options.router.transition( new UserView({
                  model: model
                }));
              },
              error: function (model, response, options) {
                //console.log('error', model);
                if (Config.debug) {
                  options.router.transition( new UserView({
                    model: model
                  }));
                }
              },
              router: this
            });
          } else {
            this.transition(new UserView({
              model: this.client
            }));
          }
        }
    });

    return AppRouter;
});
