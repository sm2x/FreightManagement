var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');

const ADMIN = require('../../models/admin');

function createToken(data) {
    return jwt.sign(data, "DonateSmile");
}

var register = async (req, res) => {
    const V = new Validator(req.body, {
        email: 'required|email',
        password: 'required',
        fullname: 'required'
    });
    let matched = await V.check().then((val) => val);
    if (!matched) {
        return res.status(400).send({ status: false, errors: V.errors });
    }

    let insertData = {
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        fullname: req.body.fullname,
        user_type: "Subadmin",
        token: createToken(req.body)
    }
    if (req.body.mobile != '' || req.body.mobile != null || typeof req.body.mobile != 'undefined') {
        insertData.mobile = req.body.mobile;
    }

    if (typeof (req.body.phone) != "undefined") {
        insertData.phone = Number(req.body.phone);
    }

    const modelData = await new ADMIN(insertData);
    return modelData
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                success: true,
                message: 'Data inserted successfully',
                data: data,
            });
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

var viewAll = async (req, res) => {
    var subadmins = await ADMIN.find({ user_type: "Subadmin" }).exec();

    // console.log(subadmins);
    if (subadmins.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: subadmins
        });
    }
    else {
        return res.status(200).json({
            status: true,
            message: "No subadmin has been added.",
            data: null
        });
    }
}

var viewSubadminById = async (req, res) => {
    var id = req.params.id;

    return ADMIN.findOne(
        {
            _id: mongoose.Types.ObjectId(id)
            // user_type: "Subadmin"
        }
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
    register,
    viewAll,
    viewSubadminById
}