var mongoose = require("mongoose");
const { Validator } = require('node-input-validator');

const USER_PERMISSIONS = require('../../models/user_permissions');

var addPermissions = async (req, res) => {
    const v = new Validator(req.body, {
        permissions: 'required',
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(400).send({ status: false, errors: v.errors });
    }
    let saveData = {
        _id: mongoose.Types.ObjectId(),
        user_id: mongoose.Types.ObjectId(req.body.user_id),
        cmpny_uid: Number(req.body.cmpny_uid),
        permissions: req.body.permissions
    }
    if (req.body.fax != "" || req.body.fax != null || typeof req.body.fax != "undefined") {
        saveData.fax = req.body.fax;
    }

    const NEW_PERMISSIONS = new USER_PERMISSIONS(saveData);

    return NEW_PERMISSIONS.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data added successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to add data. Server error.",
                error: err.message
            });
        });
}

var viewAllPermissions = async (req, res) => {
    return USER_PERMISSIONS.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_data'
            }
        },
        {
            $unwind: '$user_data'
        },
        {
            $lookup: {
                from: 'companies',
                localField: 'cmpny_uid',
                foreignField: 'unique_id',
                as: 'company_data'
            }
        },
        {
            $unwind: '$company_data'
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
                message: "Data get successfully!",
                data: data
            });
        })
        .catch(err=>{
            res.status(500).json({
                status: false,
                message: "Failed to get data. Server error.",
                error: err
            });
        })
}

module.exports = {
    addPermissions,
    viewAllPermissions
}