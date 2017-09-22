var express = require('express');
var router = express.Router();

router.all('/brothers',
    function(req, res){
        res.locals.title = 'Brothers';
        if (req.session && req.session.userid) {
            res.locals.userid = req.session.userid;
            res.locals.username = req.session.username;
            res.locals.firstname = req.session.firstname;
            res.locals.lastname = req.session.lastname;
            res.locals.email = req.session.email;
        }

        res.render('brothers');
    });

module.exports = router;

