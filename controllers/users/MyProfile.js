var mongoose = require('mongoose');

const USER = require('../../models/user');
const USER_PERMISSIONS = require('../../models/user_permissions');

var getSelfProfile = async (req, res) => {
    var id = req.params.id;

    return USER.findOne(
        { _id: mongoose.Types.ObjectId(id) }
    )
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

var viewPermissions = async (req, res) => {
    var user_id = req.params.user_id;

    var permissions = await USER_PERMISSIONS.find({ user_id: mongoose.Types.ObjectId(user_id) }).exec();

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
            message: "No permissions given.",
            data: null
        });
    }
}

module.exports = {
    getSelfProfile,
    viewPermissions
}