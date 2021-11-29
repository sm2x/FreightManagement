var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SUBADMIN_PERMISSION_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subadmin_id: mongoose.Schema.Types.ObjectId,
    permissions: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("subadmin_permission", SUBADMIN_PERMISSION_SCHEMA);