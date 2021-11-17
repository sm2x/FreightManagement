var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema;

const COMPANY_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String, // mongoose.Schema.Types.ObjectId
        required: true
    },
    telephone: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
    fax: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    token: String,
    status: {
        type: Boolean,
        default: true
    }
});

COMPANY_SCHEMA.methods.comparePassword = function (candidatePassword) {
    return passwordHash.verify(candidatePassword, this.password);
}

module.exports = mongoose.model("company", COMPANY_SCHEMA);