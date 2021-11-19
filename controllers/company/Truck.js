var mongoose = require('mongoose');

const TRUCK = require('../../models/truck');

var viewAllTrucks = async (req, res) => {
    var cmpny_uid = req.params.cmpny_uid;
    var trucks = await TRUCK.find(
        { cmpny_id: Number(cmpny_uid) }
    ).exec();

    if (trucks.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: trucks
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No trucks added till date.",
            data: null
        });
    }
}

var viewTruckById = async (req, res) => {
    var cmpny_uid = req.params.cmpny_uid;
    var id = req.params.id;

    return TRUCK.findOne(
        {
            cmpny_id: Number(cmpny_uid),
            _id: mongoose.Types.ObjectId(id)
        })
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

module.exports = {
    viewAllTrucks,
    viewTruckById
}