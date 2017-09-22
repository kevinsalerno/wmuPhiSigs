require ( './bootstrap' );
//require ( './config' ); );

var App = window.App = new Marionette.Application();

var AppLayoutView 	= require ( './mvc/views/layouts/app.js' );
var NavigationView     	= require ( './mvc/views/navigation.js' );
var FooterView     	= require ( './mvc/views/footer.js' );

var User    = require ( './mvc/models/user.js' );
var FbUser    = require ( './mvc/models/fbuser.js' );
App.activeSession = window.activeSession = new FbUser();

var MyController  	= require ( './mvc/controller.js' )			(App);
var MyRouter      	= require ( './mvc/router.js' ) 			(MyController);



App.on ( "before:start", function () {




  App.layout = new AppLayoutView().render ();

 // App.layout.navigation.show ( new NavigationView () );
  App.layout.footer.show ( new FooterView () );

  router = new MyRouter ();

    App.User = new User();

  if ( Backbone.history ) {
    Backbone.history.start ();
  }
  console.log ( "The app is starting..." );
});

App.on ( "start", function () {
  //App.User.fetch();
});

App.start ();
