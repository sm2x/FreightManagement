'use strict'

/**
 * Module exports.
 * @public
 */
var user = {};
const CompanyController = require('../controllers/auth/Company');
// const EmployeeController = require('../controllers/company/User');
// const UserController = require('../controllers/auth/User');



//Middleware
const permission = [
    {
        url: "/company/register",
    },
    {
        url: "/company/login",
    },
    {
        url: "/user/register",
    },
    {
        url: "/user/login",
    }
]

user.middleware = async (req, res, next) => {
    if (permission.filter(it => it.url == req.url).length > 0) {
        next();
    } else {
        if (!req.headers.authorization) {
            return res.status(200).json({ error: "No credentials sent!", status: false, credentials: false });
        } else {
            let authorization = req.headers.authorization
            let userData = null;
            let userType = typeof(req.headers.usertype) != "undefined" ? req.headers.usertype : "Admin";

            if (userType == "Company") {
                userData = await CompanyController.getTokenData(authorization);
            }
            // else if (userType == "Employee") {
                
            // }
            // else if (userType == "User") {
            //     userData = await UserController.getTokenData(authorization);
            // }

            if (userData && userData != null) {
                    userData.password = null;
                    userData.token = null;
                    req.user = userData;
                    req.userType= userType;
                    req.token = req.headers.authorization,
                    next();
            } else {
                res.status(200).json({ error: "Credentials do not match.", status: false, credentials: false });
            }

        }
    }

}



module.exports = user;