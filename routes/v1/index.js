var express = require('express');
var multer = require('multer');

var adminRoute = require('./admin');
var companyRoute = require('./company');
var userRoute = require('./user');

const MIDDLEWARE = require('../../service/middleware').middleware;

var router = express.Router();

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const AUTH_ADMIN = require('../../controllers/auth/SuperAdmin');
const AUTH_COMPANY = require('../../controllers/auth/Company');
const AUTH_USER = require('../../controllers/auth/User');

const EMPLOYEE = require('../../controllers/company/Employee');

/** ================================= without login url ================================= */
router.post('/admin/register', upload.single("image"), AUTH_ADMIN.register);
router.post('/admin/login', AUTH_ADMIN.login);

router.post('/company/register', AUTH_COMPANY.register);
router.post('/company/login', AUTH_COMPANY.login);

router.post('/company/employee/register', EMPLOYEE.register);

router.post('/user/register', AUTH_USER.register);
router.post('/user/login', AUTH_USER.login);
/** =============================== without login url end =============================== */

router.use(MIDDLEWARE);

router.use('/admin', adminRoute);
router.use('/company', companyRoute);
router.use('/user', userRoute);

module.exports = router;