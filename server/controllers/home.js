var express = require('express');
var router = express.Router();

router.get('/',
    function(req, res){
        res.render('index', { title: 'WMU Phi Sigma Kappa' 
    });
});

module.exports = router;

