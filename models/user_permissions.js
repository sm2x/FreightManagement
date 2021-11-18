var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PERMISSION_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    cmpny_uid: Number,
    permissions: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("user_permission", PERMISSION_SCHEMA);