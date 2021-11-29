var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

var SUBADMIN_PERMISSIONS = require('../../models/subadmin_permissions');

var addPermission = async (req, res) => {
    const V = new Validator(req.body, {
        permissions: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        subadmin_id: mongoose.Types.ObjectId(req.body.subadmin_id),
        permissions: req.body.permissions
    }
    const NEW_PERMISSION = new SUBADMIN_PERMISSIONS(saveData);

    return NEW_PERMISSION
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                success: true,
                message: 'Data inserted successfully',
                data: data,
            });
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

var viewAllPermissions = async (req, res) => {
    return SUBADMIN_PERMISSIONS.aggregate([
        {
            $lookup: {
                from: "admins",
                localField: "subadmin_id",
                foreignField: "_id",
                as: "subadmin_data"
            }
        },
        {
            $unwind: "$subadmin_data"
        },
        {
            $project: {
                __v: 0
            }
        }
    ])
        .then(data=>{
            res.status(200).json({
                status: true,
                message: "Data successfully get.",
                data: data
            });
        })
        .catch(err=>{
            res.status(500).json({
                status: false,
                message: "Failed to get data. Server error.",
                error: err.message
            });
        });
}

module.exports = {
    addPermission,
    viewAllPermissions
}