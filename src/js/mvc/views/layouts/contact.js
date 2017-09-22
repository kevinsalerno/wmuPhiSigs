var ContactView = require('../contact/contact.js');

var ContentView = require('../../views/content.js');

var App = window.App;

module.exports = Marionette.LayoutView.extend({

    template : require ( "../../../../tpl/layouts/layout-contact.template.html" ), 
    regions  : {
      main: "#main",
      modal: {
        selector: "#modal",
        regionClass: Marionette.Modals
      }
  },

  initialize: function(){
    Backbone.Courier.add( this );
  },

  onBeforeShow : function(){
    this.main.show(new ContactView({
      model: App.User
    }));
  },

  onMessages : {
       
  },

});