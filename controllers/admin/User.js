var mongoose = require('mongoose');

const USER = require('../../models/user');

var viewAllUsers = async (req, res) => {
    var users = await USER.find().exec();

    if (users.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: users
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No registered user found.",
            data: null
        });
    }
}

var viewUserById = async (req, res) => {
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
        .catch(err=>{
            res.status(500).json({
                status: false,
                message: "Invalid id. Server error.",
                error: err.message
            });
        });
}

module.exports = {
    viewAllUsers,
    viewUserById
}