var express = require('express');

var router = express.Router();

const USER = require('../../controllers/admin/User');
const USER_PERMISSIONS = require('../../controllers/admin/UserPermissions');
const COMPANY = require('../../controllers/admin/Company');

router.get('/users', USER.viewAllUsers);
router.get('/users/:id', USER.viewUserById);

router.post('/user-permissions', USER_PERMISSIONS.addPermissions);

router.get('/companies', COMPANY.viewAllCompanies);
router.get('/companies/:id', COMPANY.viewCompanyById);

module.exports = router;