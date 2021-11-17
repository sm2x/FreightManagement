var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema;

const USER_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cmpny_id: mongoose.Schema.Types.ObjectId,
    cmpny_uid: Number,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {            //
        type: String,
        default: "User"
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
    fax: String,
    country: {
        type: Array,
        required: true
    },
    language: {
        type: Array,
        required: true
    },
    token: String,
    status: {
        type: Boolean,
        default: true
    }
});

USER_SCHEMA.methods.comparePassword = function (candidatePassword) {
    return passwordHash.verify(candidatePassword, this.password);
}

module.exports = mongoose.model("user", USER_SCHEMA);