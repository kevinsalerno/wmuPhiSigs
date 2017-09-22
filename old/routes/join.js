var express = require('express');
var router = express.Router();

app.all('/join',
    function(req, res){
        addLocals('Join', res, req);
            res.render('join');
    });

module.exports = router;

