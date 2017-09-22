var express = require('express');
var router = express.Router();

var queries = require('../queries');



router.all('/dashboard/members', function(req, res) {
		res.locals.title = 'Members';
        if (req.session && req.session.userid) {
            res.locals.userid = req.session.userid;
            res.locals.username = req.session.username;
            res.locals.firstname = req.session.firstname;
            res.locals.lastname = req.session.lastname;
            res.locals.email = req.session.email;
        
            queries.getMembers(function(cb) { 
            //res.json(cb);

            var sqlResult = cb.Result;

            
            var members = sqlResult[0];
            //res.json(members[0]);
            res.locals.members = members;
            res.render('dashboard/members');
            
        });
			//user: require('/routes/partials/user');
        }


        else {
            res.redirect("/");
        }

});

module.exports = router;

