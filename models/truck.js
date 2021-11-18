var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TRUCK_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    cmpny_uid: Number,
    date_of_loading: {
        type: Date,
        required: true
    },
    load_point: {
        type: String,
        required: true
    },
    unload_point: {
        type: String,
        required: true
    },
    distance: Number,
    type: {
        type: String,
        required: true
    },
    drive_length: {
        type: Number,
        required: true
    },
    trailer_length: {
        type: Number,
        required: true
    },
    drive_weight: {
        type: Number,
        required: true
    },
    trailer_weight: {
        type: Number,
        required: true
    },
    trailer_body: {
        body_type: String,
        equipment: String
    },
    gps_tracking: Boolean,
    gps_device: String,
    remarks: String,
    truck_contact: Object,
    self_note: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("truck", TRUCK_SCHEMA);