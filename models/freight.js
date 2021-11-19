var mongoose = require('mongoose');
// var moment = require('moment');

var Schema = mongoose.Schema;

const FREIGHT_SCHEMA = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    cmpny_uid: Number,
    loading_places: {
        type: Number,
        default: 1
    },
    loading_country_name: {
        type: String,
        required: true
    },
    loading_town_zip: {
        type: Number,
        required: true
    },
    loading_town_name: {
        type: String,
        required: true
    },
    loading_datetime: {
        type: Date,
        required: true
    },
    unloading_places: {
        type: Number,
        default: 1
    },
    unloading_country_name: {
        type: String,
        required: true
    },
    unloading_town_zip: {
        type: Number,
        required: true
    },
    unloading_town_name: {
        type: String,
        required: true
    },
    unloading_datetime: {
        type: Date,
        required: true
    },
    distance: Number,
    length: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    goods_type: {
        type: String,
        required: true
    },
    addn_info: Array,
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    payment_due: {
        type: Number,
        required: true
    },
    equipment_exchange: {
        type: String,
        default: 'Not specified'
    },
    vehicle_types: {
        type: String,
        required: true
    },
    trailer_body: {
        body_type: String,
        equipment: String
    },
    non_listed_trailer_body_type: {
        type: Boolean,
        default: false
    },
    gps_tracking: {
        type: Boolean,
        default: false
    },
    remarks: String,
    truck_contact: Object,
    self_note: String,
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("freight", FREIGHT_SCHEMA);