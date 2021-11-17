var mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

const COMPANY = require('../../models/company');

function createToken(data) {
    return jwt.sign(data, 'DonateSmile');
}

var getTokenData = async (token) => {
    let adminData = await Admin.findOne({ token: token }).exec();
    // console.log('adminData', adminData);
    return adminData;
}

var register = async (req, res) => {
    const V = new Validator(req.body, {
        name: 'required',
        email: 'required|email',
        password: 'required',
        type: 'required',
        telephone: 'required',
        uid: 'required',
        fax: 'required',
        address: 'required'
    });
    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(400).json({ status: false, errors: V.errors });
    }

    let saveData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        // type: req.body.type, // mongoose.Types.ObjectId()
        telephone: req.body.telephone,
        uid: req.body.uid,
        fax: req.body.fax,
        address: req.body.address,
        token: createToken(req.body)
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

var login = async(req,res) =>
{
    let v = new Validator(req.body,{
        email:'required|email',
        password:'required|minLength:8'
    })
    let matched = await v.check().then((val)=>val)
    if(!matched)
    {
        return res.status(401).json({
            status:false,
            error: v.errors
        })
    }

    COMPANY.findOne({email:req.body.email})
        //   .exe()
          .then(data =>{
                if(data!=null && data!='' && data.length < 1 )
                {
                    return res.status(401).json({
                            status: false,
                            message: 'Server error. Please try again.',
                            error: 'Server Error',
                        });
                }
                if(data!=null && data!='' && data.comparePassword(req.body.password))
                {
                    return res.status(200).json({
                        status: true,
                        message: 'Company login successful',
                        data: data
                    });
                }
                else
                {
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