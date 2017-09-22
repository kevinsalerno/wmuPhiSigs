var express = require('express');
var router = express.Router();

router.all('/history',
    function(req, res){
        addLocals('History', res, req);
            res.render('history');
    });


module.exports = router;