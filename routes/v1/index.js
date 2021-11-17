var express = require('express');
var multer = require('multer');

var companyRoute = require

var router = express.Router();

const MIDDLEWARE = require('../../service/middleware').middleware;

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const AUTH_COMPANY = require('../../controllers/auth/Company');

/** ================================= without login url ================================= */
router.post('/company/register', AUTH_COMPANY.register);
router.post('/company/login', AUTH_COMPANY.login);
/** =============================== without login url end =============================== */

router.use(MIDDLEWARE);

router.use('/company', companyRoute);

module.exports = router;