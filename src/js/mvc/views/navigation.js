module.exports = Marionette.CompositeView.extend({
  template   : require ( "../../../tpl/navigation.template.html" ),
  className: "container",
  childView: require("./navigation-item")
});
