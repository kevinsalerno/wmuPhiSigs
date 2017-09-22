var ContentView = require('./views/content.js');
var RushLayout = require('./views/layouts/rush.js');
var HomeLayout = require('./views/layouts/home.js');
var ContactLayout = require('./views/layouts/contact.js');
//var DashboardView = require('./views/dashboard/dashboard.js');

//var LoginView       = require ( './mvc/views/login.js' );

var App = window.App;

module.exports    = function ( app ) {

  return Marionette.Controller.extend ({ 

      dashboard : function () {
      	/*
        app.layout.content.show ( new DashboardView({
          model: App.User
        }));
        */
      },

      content : function () {
          var contentView = new ContentView({
          	 model : new Backbone.Model ( { message : "hello there" } ) 
          });
          app.layout.content.show ( contentView );
      },

      rush : function () {
        var rushLayout = new RushLayout().render();
        app.layout.content.show (rushLayout);
      },

      home : function () {
        var homeLayout = new HomeLayout().render();
        app.layout.content.show (homeLayout);
      },

      contact : function () {
        var contactLayout = new ContactLayout().render();
        app.layout.content.show (contactLayout);
      },
  });
};
