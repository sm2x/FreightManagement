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
        type: 'required',
        mobile: 'required',
        position: 'required',
        fax: 'required',
        country: 'required',
        language: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }
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