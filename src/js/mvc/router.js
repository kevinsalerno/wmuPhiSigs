module.exports = function ( Controller ) {

  return Marionette.AppRouter.extend ({

      controller  : new Controller (), 
      appRoutes   : {

        ""              : "home",
        "contact"              : "contact",
        "rush"			: "rush"
    }
  });
};
