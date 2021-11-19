var mongoose = require('mongoose');

const COMPANIES = require('../../models/company');

var viewAllCompanies = async (req, res) => {
    var companies = await COMPANIES.find().exec();

    if (companies.length > 0) {
        return res.status(200).json({
            status: true,
            message: "Data successfully get.",
            data: companies
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

var viewCompanyById = async (req, res) => {
    var id = req.params.id;

    return COMPANIES.findOne(
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
    viewAllCompanies,
    viewCompanyById
}