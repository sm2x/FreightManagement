var mongoose = require('mongoose');

const USER = require('../../models/user');

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

module.exports = {
    getSelfProfile
}