var express = require('express');

var router = express.Router();

const SUBADMIN = require('../../controllers/admin/Subadmin');
const SUBADMIN_PERMISSIONS = require('../../controllers/admin/SubadminPermissions');
const COMPANY = require('../../controllers/admin/Company');
const USER = require('../../controllers/admin/User');
const USER_PERMISSIONS = require('../../controllers/admin/UserPermissions');

router.post('/subadmin-register', SUBADMIN.register);

router.get('/subadmin', SUBADMIN.viewAll);
router.get('/subadmin/:id', SUBADMIN.viewSubadminById);

router.post('/subadmin-permissions', SUBADMIN_PERMISSIONS.addPermission);
router.get('/subadmin-permissions', SUBADMIN_PERMISSIONS.viewAllPermissions);

router.get('/companies', COMPANY.viewAllCompanies);
router.get('/companies/:id', COMPANY.viewCompanyById);

router.get('/users', USER.viewAllUsers);
router.get('/users/:id', USER.viewUserById);

router.post('/user-permissions', USER_PERMISSIONS.addPermissions);
router.get('/user-permissions', USER_PERMISSIONS.viewAllPermissions);

module.exports = router;