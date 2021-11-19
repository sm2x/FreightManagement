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
    getSelfProfile,
    viewPermissions
}