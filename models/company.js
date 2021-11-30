var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema;

const COMPANY_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unique_id: Number,
    company_name: {
        type: String,
        required: true
    },
    company_email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salutation: String,
    contact_firstname: String,
    contact_lastname: String,
    account_type: String,
    entity_type: String,
    account_plan: String,
    telephone: {
        type: String,
        unique: true
    },
    tax_regn_no: {
        type: String,
        unique: true
    },
    fax: {
        type: String,
        unique: true
    },
    street: {
        type: String,
        unique: true
    },
    city: String,
    country: Object,
    pin: Number,
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