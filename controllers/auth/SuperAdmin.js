var mongoose = require('mongoose')
var SuperAdmin = require('../../models/super_admin');
const passwordHash = require('password-hash');

var jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');
// const S3 = require('../../service/s3');

// username
// email
// password
// country
// loginType
// clientID
// token


function createToken(data) {
    return jwt.sign(data, 'DonateSmile');
}

const register = async (req, res) => {

    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required',
        fullname: 'required',
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(400).send({ status: false, error: v.errors });
    }

    let insertData = {
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        fullname: req.body.fullname,
        token: createToken(req.body),
    };

    if (typeof (req.body.phone) != "undefined") {
        insertData.phone = Number(req.body.phone);
    }

    const modelData = await new SuperAdmin(insertData);
    return modelData
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                success: true,
                message: 'New Admin created successfully',
                data: data,
            });
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                success: false,
                message: 'Server error. Please try again.',
                error: error,
            });
        });
}

const login = async (req, res) => {
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(200).send({ status: false, error: v.errors });
    }

    return SuperAdmin.findOne({ email: req.body.email })
        .then(async (findData) => {
            if (findData != null && findData.comparePassword(req.body.password)) {
                await SuperAdmin.updateOne(
                    { _id: { $in: [mongoose.Types.ObjectId(findData._id)] } },
                    { $set: { "deviceToken": req.body.deviceToken } }
                );
                findData.password = null;
                res.status(200).json({
                    status: true,
                    message: 'Admin login successful',
                    data: findData
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: 'No Admin found',
                    data: null
                });
            }
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                message: 'Server error. Please try again.',
                error: err,
            });
        });
    // res.send({status: false});
}
// email|username|clientId|fullname|country|deviceToken|photo

const getProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'user profile get successful',
        data: req.user
    });
}

const getTokenData = async (token) => {
    let adminData = await SuperAdmin.findOne({ token: token }).exec();
    // console.log('adminData', adminData);
    return adminData;
}

const update = async (req, res) => {
    // console.log("req.params.id", req.user._id);
    if (typeof (req.body.password) != "undefined") {
        req.body = req.splite(req.body, "password");
    }
    return SuperAdmin.findOneAndUpdate({ _id: { $in: [mongoose.Types.ObjectId(req.user._id)] } }, req.body, async (err, findData) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err,
            });
        } else if (findData != null) {
            findData = { ...findData._doc, ...req.body };
            return res.status(200).json({
                success: true,
                message: 'Admin update successful',
                data: findData
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Admin not match',
                data: null
            });
        }
    })
}


const passwordChange = async (req, res) => {
    const v = new Validator(req.body, {
        password: 'required|minLength:8',
        oldPassword: 'required|minLength:8'
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(200).send({ status: false, error: v.errors });
    }
    console.log('req.user._id', req.user._id);
    return SuperAdmin.findOne({ _id: { $in: [mongoose.Types.ObjectId(req.user._id)] } }, async (err, findData) => {
        // console.log('findData', findData, req.body.oldPassword);
        if (err) {
            res.status(200).json({
                status: false,
                message: 'Server error. Please try again.',
                error: err,
            });
        } else if (findData != null && findData.comparePassword(req.body.oldPassword)) {
            await SuperAdmin.updateOne(
                { _id: { $in: [mongoose.Types.ObjectId(findData._id)] } },
                { $set: { password: passwordHash.generate(req.body.password), } }
            );
            findData.password = null;
            res.status(200).json({
                status: true,
                message: 'admin password change successful',
                data: admin
            });
        } else {
            res.status(200).json({
                status: false,
                message: 'No admin found',
                data: null
            });
        }
    });
}

const imageUpload = async (req, res) => {
    // let uploadDAta = await S3.doUpload(req, "admin/profile/"+ req.user._id);
    // if (uploadDAta.status) {
    //     res.send(uploadDAta);
    // } else {
    //     res.send(uploadDAta);
    // }
}

module.exports = {
    register,
    login,
    getProfile,
    getTokenData,
    update,
    passwordChange,
    imageUpload
}
