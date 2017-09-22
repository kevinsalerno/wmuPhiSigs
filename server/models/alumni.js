// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var alumniSchema = mongoose.Schema({

    email            : String,
    firstname		 : String,
    lastname		 : String,
    createdDate      : { type: Date, default: Date.now },
    pin              : Number,
    phone            : String,
    address          : String,
    city             : String,
    state            : String,
    zip              : String,
    graduationDate   : Date,
    bigBrother       : String,
    pledgeClass      : String,
    info             : String

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Alumni', alumniSchema);



/*
User.findById = function (id, callback) {
    db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));
    });

}


User.prototype.data = {};

User.prototype.save = function (callback) {
    var self = this;
    db.get('users', {id: this.data.id}).update(JSON.stringify(this.data)).run(function (err, result) {
        if (err) return callback(err);
        callback(null, self);
    });

}
*/