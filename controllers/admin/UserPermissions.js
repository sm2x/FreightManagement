var mongoose = require("mongoose");
const { Validator } = require('node-input-validator');

const USER_PERMISSIONS = require('../../models/user_permissions');

var addPermissions = async (req, res) => {
    const v = new Validator(req.body, {
        name: 'required',
        email: 'required|email',
        type: 'required',
        mobile: 'required',
        position: 'required',
        country: 'required',
        language: 'required',
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
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        mobile: Number(req.body.mobile),
        position: req.body.position,
        country: req.body.country,
        language: req.body.language,
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
    var permissions = await USER_PERMISSIONS.find().exec();

    if (permissions.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: permissions
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No permissions given till date.",
            data: null
        });
    }
}

module.exports = {
    addPermissions,
    viewAllPermissions
}