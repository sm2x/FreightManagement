var mongoose = require('mongoose');

const { Validator } = require('node-input-validator');

const COMPANY = require('../../models/company');

var getSelfProfile = async (req, res) => {
    var id = req.params.id;

    return COMPANY.findOne(
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

var updateProfile = async (req, res) => {
    const V = new Validator(req.body, {
        company_name: 'required',
        company_email: 'required|email'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    var id = req.params.id;

    return COMPANY.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        req.body,
        { new: true }
    )
        .then(docs => {
            res.status(200).json({
                status: true,
                message: "Data successfully edited.",
                data: docs
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
    getSelfProfile,
    updateProfile
}