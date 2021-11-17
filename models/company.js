var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema;

const COMPANY_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unique_id: Number,
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
    type: String,
    telephone: {
        type: String,
        required: true,
        unique: true
    },
    tax_regn_no: {
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
    country: Array,
    token: String,
    status: {
        type: Boolean,
        default: true
    }
});

// verify encrypted password
COMPANY_SCHEMA.methods.comparePassword = function (candidatePassword) {
    return passwordHash.verify(candidatePassword, this.password);
}

module.exports = mongoose.model("company", COMPANY_SCHEMA);