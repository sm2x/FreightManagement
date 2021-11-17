var express = require('express');
var multer = require('multer');

var companyRoute = require('./company');

var router = express.Router();

const MIDDLEWARE = require('../../service/middleware').middleware;

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const AUTH_COMPANY = require('../../controllers/auth/Company');
const AUTH_USER = require('../../controllers/auth/User');

/** ================================= without login url ================================= */
router.post('/company/register', AUTH_COMPANY.register);
router.post('/company/login', AUTH_COMPANY.login);

router.post('/user/register', AUTH_USER.register);
router.post('/user/login', AUTH_USER.login);
/** =============================== without login url end =============================== */

router.use(MIDDLEWARE);

router.use('/company', companyRoute);

module.exports = router;