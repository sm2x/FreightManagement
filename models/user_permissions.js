var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PERMISSION_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
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
    type: {            //
        type: String,
        required: true
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
    permissions: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("user_permission", PERMISSION_SCHEMA);