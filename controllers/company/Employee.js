var mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

const USER = require('../../models/user');

function createToken(data) {
    return jwt.sign(data, 'DonateSmile');
}

var getTokenData = async (token) => {
    let adminData = await USER.findOne({ token: token }).exec();
    // console.log('adminData', adminData);
    return adminData;
}

var register = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        email: 'required|email',
        password: 'required',
        // type: 'required',
        mobile: 'required',
        position: 'required',
        country: 'required',
        language: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        cmpny_id: mongoose.Types.ObjectId(req.body.cmpny_id),
        name: req.body.name,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        // type: req.body.type,
        mobile: Number(req.body.mobile),
        position: req.body.position,
        country: req.body.country,
        language: req.body.language,
        token: createToken(req.body)
    }
    if (req.body.cmpny_uid != "" || req.body.cmpny_uid != null || typeof req.body.cmpny_uid != "undefined") {
        saveData.cmpny_uid = req.body.cmpny_uid;
    }
    if (req.body.type != "" || req.body.type != null || typeof req.body.type != "undefined") {
        saveData.type = req.body.type;
    }
    if (req.body.fax != "" || req.body.fax != null || typeof req.body.fax != "undefined") {
        saveData.fax = req.body.fax;
    }

    const NEW_USER = new USER(saveData);

    return NEW_USER.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: "Data saved successfully!",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: false,
                message: "Failed to save data. Server error.",
                error: err.message
            });
        });
}

module.exports = {
    getTokenData,
    register
}