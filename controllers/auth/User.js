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
        cmpny_uid: 'required',
        name: 'required',
        email: 'required|email',
        password: 'required',
        type: 'required',
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
        cmpny_uid: Number(req.body.cmpny_uid),
        name: req.body.name,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        type: req.body.type,
        mobile: Number(req.body.mobile),
        position: req.body.position,
        country: req.body.country,
        language: req.body.language,
        token: createToken(req.body)
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

var login = async (req, res) => {
    let v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    })
    let matched = await v.check().then((val) => val)
    if (!matched) {
        return res.status(401).json({
            status: false,
            error: v.errors
        })
    }

    USER.findOne({ email: req.body.email })
        //   .exe()
        .then(data => {
            if (data != null && data != '' && data.length < 1) {
                return res.status(401).json({
                    status: false,
                    message: 'Server error. Please try again.',
                    error: 'Server Error',
                });
            }
            if (data != null && data != '' && data.comparePassword(req.body.password)) {
                return res.status(200).json({
                    status: true,
                    message: 'User login successful',
                    data: data
                });
            }
            else {
                return res.status(200).json({
                    status: false,
                    error: 'Server error. Please try again.',
                    data: null
                });
            }
        }

        )
}

module.exports = {
    getTokenData,
    register,
    login
}