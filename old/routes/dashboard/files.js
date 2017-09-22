var express = require('express');
var router = express.Router();

router.all('/dashboard/files', function(req, res) {
		res.locals.title = 'Files';
        if (req.session && req.session.userid) {
            res.locals.userid = req.session.userid;
            res.locals.username = req.session.username;
            res.locals.firstname = req.session.firstname;
            res.locals.lastname = req.session.lastname;
            res.locals.email = req.session.email;
        
			res.render('dashboard/files', {
			});
			//user: require('/routes/partials/user');
        }


        else {
            res.redirect("/");
        }

});

module.exports = router;

