var mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

const COMPANY = require('../../models/company');

function createToken(data) {
    return jwt.sign(data, 'DonateSmile');
}

var getTokenData = async (token) => {
    let adminData = await COMPANY.findOne({ token: token }).exec();
    // console.log('adminData', adminData);
    return adminData;
}

var register = async (req, res) => {
    const V = new Validator(req.body, {
        company_name: 'required',
        company_email: 'required|email',
        password: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        unique_id: `${new Date().getDate()}${new Date().getHours()}${new Date().getSeconds()}${new Date().getMilliseconds()}`,
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        password: passwordHash.generate(req.body.password),
        account_type: req.body.account_type,
        token: createToken(req.body)
    }
    if (req.body.salutation != "" || req.body.salutation != null || typeof req.body.salutation != "undefined") {
        saveData.salutation = req.body.salutation;
    }
    if (req.body.contact_firstname != "" || req.body.contact_firstname != null || typeof req.body.contact_firstname != "undefined") {
        saveData.contact_firstname = req.body.contact_firstname;
    }
    if (req.body.contact_lastname != "" || req.body.contact_lastname != null || typeof req.body.contact_lastname != "undefined") {
        saveData.contact_lastname = req.body.contact_lastname;
    }
    if (req.body.entity_type != "" || req.body.entity_type != null || typeof req.body.entity_type != "undefined") {
        saveData.entity_type = req.body.entity_type;
    }
    if (req.body.account_plan != "" || req.body.account_plan != null || typeof req.body.account_plan != "undefined") {
        saveData.account_plan = req.body.account_plan;
    }
    if (req.body.telephone != "" || req.body.telephone != null || typeof req.body.telephone != "undefined") {
        saveData.telephone = req.body.telephone;
    }
    if (req.body.tax_regn_no != "" || req.body.tax_regn_no != null || typeof req.body.tax_regn_no != "undefined") {
        saveData.tax_regn_no = req.body.tax_regn_no;
    }
    if (req.body.fax != "" || req.body.fax != null || typeof req.body.fax != "undefined") {
        saveData.fax = req.body.fax;
    }
    if (req.body.street != "" || req.body.street != null || typeof req.body.street != "undefined") {
        saveData.street = req.body.street;
    }
    if (req.body.city != "" || req.body.city != null || typeof req.body.city != "undefined") {
        saveData.city = req.body.city;
    }
    if (req.body.country != "" || req.body.country != null || typeof req.body.country != "undefined") {
        saveData.country = req.body.country;
    }
    if (req.body.pin != "" || req.body.pin != null || typeof req.body.pin != "undefined") {
        saveData.pin = Number(req.body.pin);
    }

    const NEW_COMPANY = new COMPANY(saveData);

    return NEW_COMPANY.save()
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
                error: err
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

    COMPANY.findOne({ email: req.body.email })
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
                    message: 'Company login successful',
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