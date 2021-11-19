var mongoose = require('mongoose');

const FREIGHT = require('../../models/freight');

var viewAllFreights = async (req, res) => {
    var cmpny_uid = req.params.cmpny_uid;
    var freights = await FREIGHT.find(
        { cmpny_id: Number(cmpny_uid) }
    ).exec();

    if (freights.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: freights
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No freights added till date.",
            data: null
        });
    }
}

var viewFreightById = async (req, res) => {
    var cmpny_uid = req.params.cmpny_uid;
    var id = req.params.id;

    return FREIGHT.findOne(
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

var viewFreightByUser = async (req, res) => {
    var cmpny_uid = req.params.cmpny_uid;
    var user_id = req.params.user_id;
    var freights = await FREIGHT.find(
        {
            cmpny_id: Number(cmpny_uid), 
            user_id: mongoose.Types.ObjectId(user_id)
        }
    ).exec();

    if (freights.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: freights
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No freights added till date.",
            data: null
        });
    }
}

module.exports = {
    viewAllFreights,
    viewFreightById,
    viewFreightByUser
}