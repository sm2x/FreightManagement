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
        cmpny_uid: Number(req.body.cmpny_uid)
    }
    if (req.body.permissions != "" || req.body.permissions != null || typeof req.body.permissions != "undefined") {
        saveData.permissions = req.body.permissions;
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

module.exports = {
    addPermissions
}