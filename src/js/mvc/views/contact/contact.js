//var authWindow;
var App = window.App;

module.exports = Marionette.ItemView.extend({
  template     : require ( "../../../../tpl/contact/contact.template.html" ),

  initialize: function(){
  },

  events: {
  	"click #btnFacebook": "onClickFacebook",
    "click #btnLogin": "onLoginClick",
    "click #btnLogout": "onLogoutClick"
  },

  modelEvents : {
    "change": "render",
  },

  onRender: function(){
    if (typeof(FB)!== 'undefined'){
      console.log("fb good to go");
      FB.XFBML.parse(this.el);
    }
  },

  onSubmit: function(){
    
    
    App.User.save();
  },

  saveUser: function(){
    App.User.save();
  },

  log: function(e){
    console.log(e);
    this.render();
  },






/* old LONGER custom authentication using passport-facebook instead of passport-facebook-token */
/*
  onClickFacebook: function() {
  	//var pos = screenCenterPos(800, 500);
  	console.log("CLICKED");
  	authWindow = window.open("/auth/facebook", "authwindow", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0");
  	setTimeout(this.checkLoginStatus, 2000);
  	authWindow.focus();
  },

  checkLoginStatus: function() {
    if (authWindow.closed) {
        App.User.fetch();
    }
    else setTimeout(this.checkLoginStatus, 1000);
  }
*/



//fb shit OBSOLETE
// This is called with the results from from FB.getLoginStatus().
/*
  statusChangeCallback: function (response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  },

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState: function () {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  },


  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
 testAPI: function() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

*/

});
