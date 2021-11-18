var mongoose = require('mongoose');
const { Validator } = require('node-input-validator');

const TRUCK = require('../../models/truck');
const USER = require('../../models/user');
const USER_PERMISSIONS = require('../../models/user_permissions');

var addFreightJourney = async (req, res) => {
    const V = new Validator(req.body, {
        date_of_loading: 'required',
        load_point: 'required',
        unload_point: 'required',
        type: 'required',
        drive_length: 'required',
        trailer_length: 'required',
        drive_weight: 'required',
        trailer_weight: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let userPermission = await USER_PERMISSIONS.findOne(
        { user_id: mongoose.Types.ObjectId(req.body.user_id) }
    ).exec();

    if (userPermission.permissions == "Truck") {
        let userDetails = await USER.findOne(
            { _id: mongoose.Types.ObjectId(req.body.user_id) }
        ).exec();
    
        let saveData = {
            _id: mongoose.Types.ObjectId(),
            user_id: mongoose.Types.ObjectId(req.body.user_id),
            cmpny_uid: Number(req.body.cmpny_uid),
            date_of_loading: req.body.date_of_loading,
            load_point: req.body.load_point,
            unload_point: req.body.unload_point,
            type: req.body.type,
            drive_length: req.body.drive_length,
            trailer_length: req.body.trailer_length,
            drive_weight: req.body.drive_weight,
            trailer_weight: req.body.trailer_weight,
            truck_contact: userDetails,                         // see userDetails variable above
        }
        if (req.body.distance != "" || req.body.distance != null || typeof req.body.distance != "undefined") {
            saveData.distance = Number(req.body.distance);
        }
        if (req.body.trailer_body != "" || req.body.trailer_body != null || typeof req.body.trailer_body != "undefined") {
            saveData.trailer_body = req.body.trailer_body;
        }
        if (req.body.gps_tracking == "" || req.body.gps_tracking == null || typeof req.body.gps_tracking == "undefined") {
            saveData.gps_tracking = false;
        } else {
            saveData.gps_tracking = true;
            saveData.gps_device = "Webhibe_gps";
        }
        if (req.body.remarks != "" || req.body.remarks != null || typeof req.body.remarks != "undefined") {
            saveData.remarks = req.body.remarks;
        }
        if (req.body.self_note != "" || req.body.self_note != null || typeof req.body.self_note != "undefined") {
            saveData.self_note = req.body.self_note;
        }
    
        const NEW_JOURNEY = new TRUCK(saveData);
    
        return NEW_JOURNEY.save()
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
    else {
        return res.status(500).json({
            status: false,
            error: "No permission to add truck.",
            data: null
        });
    }
}

var viewAllTruckJourneys = async (req, res) => {
    var user_id = req.params.user_id;
    var truck_journeys = await TRUCK.find(
        { user_id: mongoose.Types.ObjectId(user_id) }
    ).exec();

    if (truck_journeys.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: truck_journeys
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No truck journeys added till date.",
            data: null
        });
    }
}

var viewTruckJourneyById = async (req, res) => {
    var id = req.params.id;

    return TRUCK.findOne({ _id: mongoose.Types.ObjectId(id) })
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data successfully get.",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Invalid id. Server error.",
                error: err.message
            });
        });
}

var editTruckJourney = async (req, res) => {
    const V = new Validator(req.body, {
        date_of_loading: 'required',
        load_point: 'required',
        unload_point: 'required',
        type: 'required',
        drive_length: 'required',
        trailer_length: 'required',
        drive_weight: 'required',
        trailer_weight: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return TRUCK.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        req.body,
        { new: true }
    ).then(data => {
        res.status(200).json({
            status: true,
            message: "Data successfully edited.",
            data: data
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            message: "Invalid id. Server error",
            error: err.message
        });
    });
}

var deleteTruckJourney = async (req, res) => {
    var id = req.params.id;

    return TRUCK.findOneAndDelete(
        { _id: mongoose.Types.ObjectId(id) }
    ).then(data => {
        res.status(200).json({
            status: true,
            message: "Data successfully deleted.",
            data: data
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            message: "Invalid id. Server error",
            error: err.message
        });
    });
}

module.exports = {
    addFreightJourney,
    viewAllTruckJourneys,
    viewTruckJourneyById,
    editTruckJourney,
    deleteTruckJourney
}