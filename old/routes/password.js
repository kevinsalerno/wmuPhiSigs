var pass = require('s-salt-pepper');
var queries                     = require('./queries');

var randomstring = require("randomstring");


pass.configure({
    pepper: 'Xzm6KmWQxeu6ShTA'
});


var password = {
// var pool_wmuPhiSigs   = mysql.createPool(dbselect.wmuPhiSigs);
    genPassword: function (pw){
        var user = [];
        pass.hash(pw, function(err, salt, hash) {
        if (err) {
                // handle error 
        }
        user.salt = salt;
        user.hash = hash;
        console.log("salt: " + salt + " hash: " + hash);
});
        return user;
},
    checkPassword: function(user, salt, password, secret){

        pass.compare(password, salt, function(err, hash){
        if (secret === hash){
            //pw correct
            return true;
        } else {
            return false;
        }
        });
    }


};


module.exports = password;