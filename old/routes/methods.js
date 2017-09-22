var methods = {
// var pool_wmuPhiSigs   = mysql.createPool(dbselect.wmuPhiSigs);
    addLocals: function (pagetitle, res, req){
        res.locals.title = pagetitle;
        if (req.session && req.session.userid) {
            res.locals.userid = req.session.userid;
            res.locals.username = req.session.username;
            res.locals.firstname = req.session.firstname;
            res.locals.lastname = req.session.lastname;
            res.locals.email = req.session.email;
        }
},

    checkLogin: function(page, res, req){
        if (req.session && req.session.userid) {
            res.render(page);
        }
        else {
            res.redirect("/");
        }
    },
};


module.exports = methods;