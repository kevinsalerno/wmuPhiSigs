module.exports = Marionette.LayoutView.extend({

    el       : "#application", 
    template : require ( "../../../../tpl/layouts/layout-app.template.html" ), 
    regions  : {

      header: "#header",
      navigation    : "#navigation",
      content : "#content",
      footer: "#footer"
  }
});