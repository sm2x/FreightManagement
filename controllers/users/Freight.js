var mongoose = require('mongoose');
const { Validator } = require('node-input-validator');

const FREIGT = require('../../models/freight');
const USER = require('../../models/user');

var addNewFreight = async (req, res) => {
    const V = new Validator(req.body, {
        loading_country_name: 'required',
        loading_town_zip: 'required',
        loading_town_name: 'required',
        loading_datetime: 'required',
        unloading_country_name: 'required',
        unloading_town_zip: 'required',
        unloading_town_name: 'required',
        unloading_datetime: 'required',
        length: 'required',
        weight: 'required',
        goods_type: 'required',
        price: 'required',
        currency: 'required',
        payment_due: 'required',
        vehicle_types: 'required',
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let userDetails = await USER.findOne(
        { _id: mongoose.Types.ObjectId(req.body.user_id) }
    ).exec();

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        user_id: mongoose.Types.ObjectId(req.body.user_id),
        cmpny_uid: Number(req.body.cmpny_uid),
        loading_country_name: req.body.loading_country_name,
        loading_town_zip: Number(req.body.loading_town_zip),
        loading_town_name: req.body.loading_town_name,
        loading_datetime: req.body.loading_datetime,
        unloading_country_name: req.body.unloading_country_name,
        unloading_town_zip: Number(req.body.unloading_town_zip),
        unloading_town_name: req.body.unloading_town_name,
        unloading_datetime: req.body.unloading_datetime,
        length: Number(req.body.length),
        weight: Number(req.body.weight),
        goods_type: req.body.goods_type,
        price: Number(req.body.price),
        currency: req.body.currency,
        payment_due: Number(req.body.payment_due),
        vehicle_types: req.body.vehicle_types,
        truck_contact: userDetails,                         // see userDetails variable above
    }
    if (req.body.distance != "" || req.body.distance != null || typeof req.body.distance != "undefined") {
        saveData.distance = Number(req.body.distance);
    }
    if (req.body.addn_info != "" || req.body.addn_info != null || typeof req.body.addn_info != "undefined") {
        saveData.addn_info = req.body.addn_info;
    }
    if (req.body.equipment_exchange != "" || req.body.equipment_exchange != null || typeof req.body.equipment_exchange != "undefined") {
        saveData.equipment_exchange = req.body.equipment_exchange;
    }
    if (req.body.trailer_body != "" || req.body.trailer_body != null || typeof req.body.trailer_body != "undefined") {
        saveData.trailer_body = req.body.trailer_body;
    }
    if (req.body.non_listed_trailer_body_type != "" || req.body.non_listed_trailer_body_type != null || typeof req.body.non_listed_trailer_body_type != "undefined") {
        saveData.non_listed_trailer_body_type = req.body.non_listed_trailer_body_type;
    }
    if (req.body.gps_tracking != "" || req.body.gps_tracking != null || typeof req.body.gps_tracking != "undefined") {
        saveData.gps_tracking = req.body.gps_tracking;
    }
    if (req.body.remarks != "" || req.body.remarks != null || typeof req.body.remarks != "undefined") {
        saveData.remarks = req.body.remarks;
    }
    if (req.body.self_note != "" || req.body.self_note != null || typeof req.body.self_note != "undefined") {
        saveData.self_note = req.body.self_note;
    }

    const NEW_FREIGT = new FREIGT(saveData);

    return NEW_FREIGT.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data saved successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to save data. Server error.",
                error: err.message
            });
        });
}

module.exports = {
    addNewFreight
}