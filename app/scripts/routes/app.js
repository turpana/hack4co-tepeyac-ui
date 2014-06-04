/*global define*/

define([
    'jquery',
    'backbone',
    'config',
    'models/user',
    'models/goal',
    'views/header',
    'views/main',
    'views/usernew',
    'views/useredit',
    'views/user',
    'views/users',
    'views/goal'
], function ($, Backbone, Config, UserModel, GoalModel, HeaderView, MainView, UserNewView,
  UserEditNew, UserView, UsersView, GoalView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        mainView: null,
        currentView: null,
        headerView: null,
        client: null,
        initialize: function (options) {
          this.headerView = new HeaderView({
            el: $('#header')
          });
          this.headerView.render().$el.fadeIn(Config.speed);
          this.headerView.on('navigate', this.navigate, this);
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
            '': 'clientIndex',
            'client': 'clientIndex',
            'client/new': 'clientNew',
            'client/:id': 'clientView',
            'client/:id/edit': 'clientEditView',
            'goal/:id': 'goalView'
        },
        clientIndex: function () {
            var view = new UsersView();
            view.on('navigate', this.navigate, this);
            this.transition(view);
        },
        clientNew: function () {
            this.client = new UserModel();
            var view = new UserNewView({
                model: new UserModel()
            });
            view.on('navigate', this.navigate, this);
            this.transition(view);
        },
        clientView: function (id) {
            if (_.isNull(this.client) 
                || this.client.isNew()
                || (id != this.client.id)
                ) {
                this.client = new UserModel({
                    id: id
                });
                var _this = this;
                this.client.fetch({
                    success: function (model, response, options) {
                        var view = new UserView({model: model});
                        view.on('navigate', _this.navigate, _this);
                        options.router.transition(view);
                    },
                    error: function (model, response, options) {
                        //console.log('error', model);
                        if (Config.debug) {
                            options.router.transition(new UserView({
                                model: model
                            }));
                        }
                    },
                    router: this
                });
            } else {
                var view = new UserView({
                    model: this.client
                });
                view.on('navigate', this.navigate, this);
                this.transition(view);
            }
        },
        clientEditView: function (id) {
            this.client = new UserModel({
                id: id
            });
            this.client.fetch({
                success: function (model, response, options) {
                    options.router.transition(new UserEditNew({
                        model: model
                    }));
                },
                error: function (model, response, options) {
                    //console.log('error', model);
                    if (Config.debug) {
                        options.router.transition(new UserEditNew({
                            model: model
                        }));
                    }
                },
                router: this
            });
        },
        goalView: function (id) {
          var goal = new GoalModel({id: id});
          goal.fetch({
            success: function (model, response, options) {
              var view = new GoalView({model: model});
              view.on('navigate', options.router.navigate, options.router);
              options.router.transition(view);
            },
            error: function (model, response, options) {},
            router: this
          });
        }
    });

    return AppRouter;
});
